import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"; // Importing jsonwebtoken library for token verification
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

    // Get access token from cookies or header (Header Format-> "Authorization: Bearer <token>")
    console.log("Request cookies:", req.cookies); // DEBUGGING
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", ""); // Separating token from header
    console.log("Verifying access token middleware called",token); // DEBUGGING
    // Check if token exists
    if (!token) {
        return res.status(400).json(new ApiError(401, "Access token is required for authentication","you are not logged in"));
    }

    
    const decodedToken = (() => {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            // Handle jwt verification errors with a custom message
            throw new ApiError(401, "Invalid or expired token");
        }
    })();

    // Using user id from decoded token, find user from DB
    const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
    ).catch(() => {
        throw new ApiError(500, "Something Went Wrong. Please Retry!");
    });

    // Check if user exists
    if (!user) {
        throw new ApiError(401, "Invalid access token");
    }

    req.user = user; // Middleware adds user to req object
    next(); // Move to next (Like logout, delete user, etc.)

});

export const verifyRefreshJWT = asyncHandler(async (req, res, next) => {
   console.log("Verifying refresh token middleware called"); // DEBUGGING
   console.log("Request body:", req.body); // DEBUGGING
    const token = req.body.refreshToken || req.cookies?.refreshToken
    if (!token) {
        return res.status(400).json(new ApiError(401, "Refresh token is required for authentication","you are not logged in"));
    }
     console.log("Verifying refresh token:", token); 
    const decodedToken = (() => {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
        
            throw new ApiError(401, "Invalid or expired refresh token");
        }
    })();
    
    const user
        = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
    ).catch(() => {
        throw new ApiError(500, "Something Went Wrong. Please Retry!");
    });
   
    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }
    req.user = user; 
    console.log("User found for refresh token:", user); // DEBUGGING
    next(); 
}
);