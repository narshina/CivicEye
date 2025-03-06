import { log } from "console";
import complaint from "../Models/complaint.js"
import jwt from "jsonwebtoken";
import user from "../Models/user.js";

const postComplaint = async (req, res) => {
    try {
        console.log(req.file); 

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        let proofPath = req.file.filename; 

        const newComplaint = new complaint({ ...req.body, proof: proofPath });
        const savedComplaint = await newComplaint.save();

        let totalComplaints = await complaint.countDocuments();
        res.json({ savedComplaint, totalComplaints });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const viewcomplaint = async (req, res) => {
    try {
        const userid = req.user.userId; 
        const complaints = await complaint.find({ userid: userid }); 
        res.json(complaints);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching complaints" });
    }
};

const vcom=async(req,res)=>{
    let complaintdetails=await complaint.find();
    console.log(complaintdetails);
    let responsedata=[];
    for(let x of complaintdetails){
        let response=await user.findById(x.userid);
        responsedata.push({
            complaints:x,
            user:response
        })
    }
    console.log(responsedata);
    res.json(responsedata);   

}



const delcomplaint=async(req,res)=>{
    let id=req.params.id;
    let response=await complaint.findByIdAndDelete(id);
    res.json(response);

}



export {postComplaint ,viewcomplaint,vcom,delcomplaint};
