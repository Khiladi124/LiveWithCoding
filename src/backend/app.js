import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// ROUTES IMPORT
import userRouter from "./routes/user.routes.js";
import problemRouter from "./routes/problem.routes.js";
import geminiRouter from './routes/gemini.routes.js';

dotenv.config();

const app=express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);


/*
    -> Configure the Express application to parse incoming JSON request bodies,
    but only if they are 16 KB or smaller. This helps prevent denial-of-service (DoS)
    attacks by limiting the size of the request body that the server will accept.
*/
app.use(express.json({ limit: "1MB" }));

// Configure the Express application to parse requests with URL-encoded payloads
app.use(express.urlencoded({ limit: "1MB", extended: true }));

// Configure Express.js application to serve static files from the "public" directory.
// Any files placed in this directory will be accessible via HTTP requests.
app.use(express.static("public"));

// Configure application to use the cookie-parser middleware.
// Used to set and access cookies in the client's browser.
app.use(cookieParser());




// ROUTES DECLARATION
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.use("/api/v1/users", userRouter); // Give control to userRouter for any routes starting with /users
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/gemini", geminiRouter);
export { app };


