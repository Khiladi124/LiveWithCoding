// Description: This file defines the routes for user-related operations such as registration, login, logout, and fetching user details.
import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUser
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const userRouter = Router();

// Routes
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
// Secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/getUser").get(verifyJWT, getUser);

export default userRouter;