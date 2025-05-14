import mongoose,{Shema} from "mongoose";
import bcrypt from "bycrypt";
import jwt from "jsonwebtoken";
import { ref } from "process";

const userSchema= new mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
     },
     password:{
        type:String,
        required:true,
        minlength:6,
        trim:true
     },
     fullname:{
        type:String,
        required:true,
        trim:true,
     },
     refreshToken:{
        type:String,
        default:"",
     },
     isAccessLimited:{
        type:Boolean,
        default:false,
     },
     iat:{
        type:Number,
        default:Math.floor(Date.now()/1000)-30,
     }

});

//Uses function instead of an arrow function because we need access to this.
userSchema.pre("save",async function(next){
if(!this.isModified("password")){
    return next();
}
this.password=await bcrypt.hash(this.password,10);
next();
});

userSchema.methods.isPasswordMatched= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        //payload
        {
            _id: this._id,
            email: this.email,
            isAccessLimited: this.isAccessLimited,
            iat: Math.floor(Date.now() / 1000) - 30, // issued at time
        },

        //secret key
        process.env.ACCESS_TOKEN_SECRET,

        // options
        // expiresIn: "15min",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },


        process.env.REFRESH_TOKEN_SECRET,


        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
export const User= mongoose.model("User",userSchema);

