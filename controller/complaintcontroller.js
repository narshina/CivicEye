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
        

        const complaints = await complaint.find({ userid:id });

        if (complaints.length === 0) {
            return res.status(404).json({ message: "No complaints found for this user" });
        }

        const responsedata = complaints.map(x => ({
            des: x.des,
            type: x.type,
            date: x.date,
            location: x.location,
            proof: x.proof
        }));

        res.status(200).json(responsedata);
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Unauthorized: Invalid token" });
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



export {postComplaint ,viewcomplaint,vcom};
