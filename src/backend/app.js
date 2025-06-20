import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// ROUTES IMPORT
import userRouter from "./routes/user.routes.js";
import problemRouter from "./routes/problem.routes.js";
import geminiRouter from './routes/gemini.routes.js';
import linkedinRouter from './routes/linkdein.routes.js';

dotenv.config();

const app=express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
    })
);



app.use(express.json({ limit: "1MB" }));


app.use(express.urlencoded({ limit: "1MB", extended: true }));

app.use(express.static("public"));


app.use(cookieParser());




// ROUTES DECLARATION
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.use("/api/v1/users", userRouter); // Give control to userRouter for any routes starting with /users
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/gemini", geminiRouter);
app.use("/api/v1/linkedin", linkedinRouter);

export { app };


