import user from "../Models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"




const register = async (req, res) => {
    try {
        const existingmail = await user.findOne({ email: req.body.email });

        if (existingmail) {
            return res.status(400).json('mail already exist');

        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        console.log(hashedPassword);
        const userData = { ...req.body, password: hashedPassword }

        const newuser = await new user(userData)
        const saveduser = await newuser.save()
        return res.json(saveduser)

    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "error occured during register" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let response = await user.findOne({ email: email })
        if (!response) {
            return res.status(500).json("user not found")
        }
        console.log(response);
        let matchedpassword = await bcrypt.compare(password, response.password)
        console.log(matchedpassword);
        if (!matchedpassword) {
            return res.status(401).json("invalid username");
        }
        const token = jwt.sign(
            {
                userId: response._id,
                email: response.email,
            },
            "abc",
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "Login successful",
            token: token,
            _id: response._id,
        });


    }
    catch (e) {
        res.status(500).json(e.message)
    }
}


const vprofile = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "ID not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        let response = await user.findById(id);
        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(response);  // Send the user data as a response
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const updateprofile = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "ID not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        let updateData = { ...req.body };

        if (req.file) {
            updateData.idproof = `/uploads/profiles/${req.file.filename}`;
        }

        let response = await user.findByIdAndUpdate(id, updateData, { new: true });

        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(response);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};







export { register, login, vprofile, updateprofile };