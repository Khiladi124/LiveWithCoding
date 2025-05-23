import mongoose from "mongoose";
import {Schema} from "mongoose";
import {Problem} from "./problem.model.js";
import {User} from "./user.model.js";

const submissionSchema = new Schema({
    problemId: {
        type: String,
        required: true,
    },
    lang:{
        type: String,
        required: true,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export const  Submission = mongoose.model("Submission", submissionSchema);
