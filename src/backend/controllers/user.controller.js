import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        
        const user = await User.findById(userId);
       
     
        const accessToken = user.generateAccessToken(); 
        const refreshToken = user.generateRefreshToken(); 
        
        await user.save({ validateBeforeSave: false }); 

        // Return both tokens
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// REGISTER USER USING TRANSACTION
const registerUser = asyncHandler(async (req, res) => {
    // A session is started using mongoose.startSession(), to group multiple operations into a single transaction.
    const session = await mongoose.startSession();

    // The transaction is started with session.startTransaction().
    // All subsequent operations associated with this session will be part of this transaction.
    session.startTransaction();
    try {
        // Get data from req
        const { email,username,password, fullname } = req.body;
        console.log(email,username, password, fullname);
        
        // If field exists then trim it and return true if it is empty
        if ([email,username, password, fullname].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "Please provide all required fields");
        }

        // Check if email is valid using javascript's regular expression test method
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }

        // Check if user already exists: email
        const existedUser = await User.findOne({ email });
        const existedUsername = await User.findOne({ username });

        // Check if user already exists: username
        if (existedUsername) {
            throw new ApiError(409, "Username already exists");
        }
        // If user exists then throw error
        if (existedUser) {
            throw new ApiError(409, "User already exists");
        }

       

        // Creates the user and links the root folder's ID to the user.
        // Again, { session } ensures this operation is part of the transaction.
        const user = await User.create(
            [
                {
                    email,
                    username,
                    password,
                    fullname,
                    
                },
            ],
            { session }
        );

       
        // If all operations succeed, session.commitTransaction() commits the transaction, making all changes permanent.
        // The session is then ended with session.endSession().
        await session.commitTransaction();
        session.endSession();

        // Remove password and refreshToken from user object
        const createdUser = await User.findById(user[0]._id).select(
            "-password -refreshToken"
        );

        // Check for user creation error
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while creating user");
        }

        // Send response if user is created successfully
        return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    createdUser,
                    "User registered successfully"
                )
            );
    } catch (error) {
        // If any operation fails, the catch block is executed. session.abortTransaction() aborts the transaction, rolling back all changes.
        await session.abortTransaction();

        // The session is then ended, and the error is thrown to be handled by the error-handling middleware.
        session.endSession();
        throw new ApiError(500, error.message);
    }
});



// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    console.log("Login called with email: "); // DEBUGGING
    // Get data from user
    console.log("12133",req.body); // DEBUGGING
    const { email, password } = req.body;
    console.log(email,password); // DEBUGGING
    // If field exists then trim it and return true if it is empty
   
    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please provide all required fields");
    }
    
    // Check if email is valid using javascript's regular expression test method

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email");
    }

    // Find user using email
    
    const user = await User.findOne({ email });
    
    // If user does not exist then throw error
    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    // Check if password is correct
   
    const isPasswordValid = await user.isPasswordMatched(password);

     // DEBUGGING
    // If password is not valid then throw error
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    // Create a new object without password and refreshToken properties
    const loggedInUser = user.toObject();
    delete loggedInUser.password;
    delete loggedInUser.refreshToken;

    // console.log("loggedInUser: ", loggedInUser); // DEBUGGING

    // Cookie options
    const options = {
        // HttpOnly: Indicates if the cookie is accessible only through the HTTP protocol and not through client-side scripts.
        httpOnly: true,
        // Secure: Indicates if the cookie should only be transmitted over secure HTTPS connections.
        secure: false, // TODO: Change to true in production
        maxAge: 24 * 60 * 60 * 1000, //cookie will expire after 1 day
    };

    // Send response
    return res
        .status(200)
        .cookie("accessToken", accessToken, options) // Set cookie in client browser
        .cookie("refreshToken", refreshToken, options) // Set cookie in client browser
        .json(
            new ApiResponse(
                200,
                {
                    // Good practice to also send tokens in response so to give some control to client
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

// LOGOUT USER
const logoutUser = asyncHandler(async (req, res) => {
   
     console.log("Logout called"); // DEBUGGING
    // Remove refresh token from DB
    //  console.log(req.body); // DEBUGGING
    const {user} = req.body;
    // console.log(user); // DEBUGGING
    await User.findByIdAndUpdate(
        user._id,
        {
            $unset: {
                refreshToken: undefined,
            },
        },
        {
            new: true, // Return updated document rather than original document
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };
     console.log("sending response"); // DEBUGGING
    // Clear cookies and send response
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// GET USER
const getUser = asyncHandler(async (req, res) => {
    // console.log(req.user);
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User authenticated"));
});

const refreshSession=asyncHandler(async (req, res) => {
    try{
    const user = req.user;
    console.log("Refreshing session for user:", user); // DEBUGGING
    if(!user) {
        throw new ApiError(401, "User not authenticated");
    }
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );
    // Update user's refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    // Set cookies for new tokens
    const options = {
        httpOnly: true,
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000, 
    };
    // Send response with new tokens
    console.log("Session refreshed successfully"); // DEBUGGING
    console.log("Access Token:", accessToken); // DEBUGGING
    console.log("New Refresh Token:", newRefreshToken); // DEBUGGING
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: user.toObject(),
                    accessToken,
                    refreshToken: newRefreshToken,
                },
                "Session refreshed successfully"
            )
        );
    } catch (error) {
        console.error("Error refreshing session:", error);
        throw new ApiError(500, "Failed to refresh session");
    }
});



export { registerUser, loginUser, logoutUser, getUser , refreshSession };