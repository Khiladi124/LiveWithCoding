import mongoose from "mongoose";
import {Schema} from "mongoose";
import {Problem} from "./problem.model.js";

const testcaseSchema =new Schema({
    input:{
        type:String,
        required:true,
    },
    output:[{
        type:String,
        required:true,
    }],
    isSample:{
        type:Boolean,
        default:false,
    },
    isHidden:{
        type:Boolean,
        default:false,
    },
    description:{
        type:String,
        default:"",
    },
    problemId:{
        type:Schema.Types.ObjectId,
        ref:"Problem",
        required:true,
    },
});

export const TestCase = mongoose.model("TestCase",testcaseSchema);

