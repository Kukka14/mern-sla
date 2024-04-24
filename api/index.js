import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sproductRouter from './routes/sproduct.route.js';
import cors from 'cors'; 
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cors()); // Use cors middleware

app.use('/api/sproduct', sproductRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
