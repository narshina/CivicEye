import express from 'express';
import cors from 'cors';
import userRouter from './routes/userroutes.js';
import { connectDB } from './utils/db.js';
import dotenv from 'dotenv';

dotenv.config();  

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.get("/uploads/proof/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads/proof", req.params.filename);
  res.download(filePath, req.params.filename, (err) => {
    if (err) {
      res.status(500).send("Error downloading file");
    }
  });
});

connectDB().then(() => {
  // console.log("MongoDB URI:", process.env.DB_URL);
  
  app.listen(5000, () => {
    console.log('✅ Server is running on http://localhost:5000');
  });
});

app.use('/user', userRouter);

export default app;
