import mongoose from "mongoose";
import 'dotenv/config';


const DB_url = process.env.url;
// const url = "mongodb+srv://narshina2001:narshina%40123@cluster0.isjztjs.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

export async function connectDB() {    
    try {
        await mongoose.connect(DB_url)
        console.log("Database connected");
    }

    catch (e) {
        console.log("not connected", e.message);
    }
}
