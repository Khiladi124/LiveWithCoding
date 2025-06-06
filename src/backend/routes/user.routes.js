// Description: This file defines the routes for user-related operations such as registration, login, logout, and fetching user details.
import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    refreshSession,
} from "../controllers/user.controller.js";

import { verifyJWT, verifyRefreshJWT } from "../middlewares/auth.middleware.js";


const userRouter = Router();

// Routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
// Secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/getUser").get(verifyJWT, getUser);
userRouter.route("/refresh").post(verifyRefreshJWT,refreshSession ); // Assuming refresh token logic is handled in getUser

export default userRouter;