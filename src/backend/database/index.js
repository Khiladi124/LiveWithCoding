import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log("Mongo URI:", process.env.DATABASE_URI);

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('MongoDB connected...');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }

}
export default connectDB;
