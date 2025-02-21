 import { timeStamp } from "console";
import mongoose from "mongoose";

 let complaintschema=new mongoose.Schema({
        des:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        proof:{
            type:String,
            required:true
        },
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        
        

 },{ timestamps: true })
 let complaint=mongoose.model('complaint',complaintschema);
 export default complaint;
