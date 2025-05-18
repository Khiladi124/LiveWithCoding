import mongoose from "mongoose";
import {Schema} from "mongoose";

const testcaseSchema =new Schema({
    input:{
        type:String,
        required:true,
    },
    output:{
        type:String,
        required:true,
    },
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
    }
});

export const TestCase = mongoose.model("TestCase",testcaseSchema);

