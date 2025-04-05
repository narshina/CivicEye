import express from 'express';
import { login, register, updateprofile, vprofile, vuser } from '../controller/usercontroller.js';
import { profileUpload ,complaintUpload} from '../multer.js';  

import { delcomplaint, managecom, postComplaint, vcom, vcomdetail, viewcomplaint } from '../controller/complaintcontroller.js';
import verifyToken from '../middleware/auth.js';
import user from '../Models/user.js';


const userRouter=express.Router()


userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/postcomplaint', complaintUpload.single('proof'),verifyToken,postComplaint);
userRouter.get('/viewcomplaint',verifyToken,viewcomplaint);
userRouter.get('/viewprofile/:id',verifyToken,vprofile);
userRouter.get('/vcom',verifyToken,vcom);
userRouter.put('/updateprofile/:id',profileUpload.single('idproof'),verifyToken,updateprofile);
userRouter.delete('/deletecomplaint/:id',delcomplaint);
userRouter.get('/vuser',verifyToken,vuser)
userRouter.get('/vcomdetail/:id',verifyToken,vcomdetail)
userRouter.put('/managecom/:id',verifyToken,managecom);



export default userRouter;