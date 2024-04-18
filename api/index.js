import express, { Router } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import listingRouter from './routes/listing.route.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MangoDB');
}).catch((err)=> {
    console.log(err);
});

const app = express();

app.use(express.json());

app.use('/api/listing', listingRouter);

app.listen(5000, ()=> {
    console.log('Server is running on port 5000');
}); 
