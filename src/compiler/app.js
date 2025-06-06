import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { runCode } from './execute.js'; 
import generateFile from './generateFile.js';

dotenv.config();


const app=express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "1MB" }));
app.use(express.urlencoded({ limit: "1MB", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.post('/run-submission', async (req, res) => {
    try {
        console.log('Received request to run submission');
        const { code, lang, input } = req.body;
        if (!code || !lang) {
            return res.status(400).json({ error: 'Code and language are required' });
        }
        
        const filePath = await generateFile(lang, code);
        if (!filePath) {
            return res.status(500).json({ error: 'Failed to generate file' });
        }
        console.log(filePath);
        const inputPath = await generateFile('txt', input || '');
        if (!inputPath) {
            return res.status(500).json({ error: 'Failed to generate input file' });
        }

        const output = await runCode({filePath, inputPath});
        
        res.status(200).json({ output });
    } catch (error) {
        console.error('Error running submission:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);
export default app;