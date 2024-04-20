import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
<<<<<<< HEAD
import contactRouter from './routes/contact.route.js';
import reviewRouter from './routes/review.route.js';
//import adminRouter from './routes/admin.route.js';
=======
import adminRouter from './routes/admin.route.js';
>>>>>>> main
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 5000');
});

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
<<<<<<< HEAD
app.use('/api/contact', contactRouter);
app.use('/api/review', reviewRouter);

=======
app.use("/api/listing", listingRouter);
>>>>>>> main

app.use((err, req, res, next) => { 
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});




