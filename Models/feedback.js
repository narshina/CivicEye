import mongoose from "mongoose";

let feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },},
     { timestamps: true }
)
let feedback = mongoose.model("feedback",feedbackSchema);
export default feedback;
