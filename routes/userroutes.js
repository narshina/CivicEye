import express from 'express';
import { login, register, updateprofile, vprofile } from '../controller/usercontroller.js';
import { profileUpload ,complaintUpload} from '../multer.js';  // ✅ Corrected import path

import { postComplaint, vcom, viewcomplaint } from '../controller/complaintcontroller.js';
import verifyToken from '../middleware/auth.js';


const userRouter=express.Router()


userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/postcomplaint', complaintUpload.single('proof'),verifyToken,postComplaint);
userRouter.get('/viewcomplaint',verifyToken,viewcomplaint);
userRouter.get('/viewprofile/:id',verifyToken,vprofile);
userRouter.get('/vcom',verifyToken,vcom);
userRouter.put('/updateprofile/:id',profileUpload.single('idproof'),verifyToken,updateprofile);

export default userRouter;