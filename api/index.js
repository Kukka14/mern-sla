import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.route.js';
//import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/contact', contactRouter);


app.use((err, req, res, next) => { 
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
