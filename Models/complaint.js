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
        status:{
            type:String,
            default:'pending'
        },
        
        
        
        

 },{ timestamps: true })
 let complaint=mongoose.model('complaint',complaintschema);
 export default complaint;
