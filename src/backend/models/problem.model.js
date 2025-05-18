import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import { TestCase } from "./testCase.model.js";
const problemSchema = new Schema(
    {
        problemId: {
            type: String,
            default: uuidv4,
            unique: true,
            required: false,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        constraints: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            
        },
        difficultyLevel: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default:"easy"
        },
       
       
        sampleTestCases: [{
           
        }],
        isPublished: {
            type: Boolean,
            default: true,
        },
        testCases:[{
            type: Schema.Types.ObjectId,
            ref: "TestCase",
        }],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);
problemSchema.pre("save", async function (next) {
    try {
        this.problemId = uuidv4();
        next();
    } catch (error) {
        next(error);
    }
});
export const Problem = mongoose.model("Problem", problemSchema);


    