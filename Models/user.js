import mongoose from "mongoose";

let usershema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    dob:{
        type:String
    },
    state:{
        type:String
    },
    idproof:{
        type:String
    },
    idproofnumber:{
        type:String
    }
})

const user=mongoose.model('user',usershema);
export default user;