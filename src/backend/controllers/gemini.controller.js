import mongoose from 'mongoose';
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { GoogleGenerativeAI as GoogleGenAI } from "@google/generative-ai";
import { Problem} from "../models/problem.model.js";
import dotenv from 'dotenv';

dotenv.config();

let ai = null;

async function init() {
  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
}

async function aiCodeReview(content) {
    
  await init();
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
    generationConfig: {
    temperature: 0.7,
    topK: 1,
    topP: 1,
  },
  });
  return response.text;
}
const getReview = async (req, res) => {
    const { problemId } = req.params;
    const { code } = req.body;

    console.log(code);
    try {
        const problem = await Problem.findOne({ problemId });
        if (!problem) {
            return res.status(404).json(new ApiError({
                status: 404,
                message: "Problem not found",
                data: "No problem found with the given ID"
            }));
        }

        const title = problem.title;
        const description = problem.description;
        const content = ` Review the following code for the problem "${title}":\n\n${code}\n\nDescription: ${description}\n\nGive suggestions for improvement, and mention optimized or modern approaches if any.`;
        console.log("Content for AI review:", content);
       const output = await aiCodeReview(content);
        console.log("AI Review Output:", output);
        res.status(200).json(new ApiResponse(
            200,
            "Content generated successfully",
            { response: output },

        ));
    } catch (error) {
        console.error("Error generating content:", error);
        return res.status(500).json(new ApiResponse(500, 'error generating content', { error: error.message }));
    }
};

export { getReview };