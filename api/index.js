
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import reviewRouter from './routes/review.route.js'
import contactRouter from './routes/contact.route.js'
import employeeRouter from './routes/employee.route.js';
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cart.route.js';
import catgoryRouter from './routes/category.route.js';
import responseRouter from './routes/response.route.js';

dotenv.config(); //environment configuration

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

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/review", reviewRouter);
app.use("/api/contact", contactRouter);
app.use('/api/employee', employeeRouter);
app.use("/api/cart", cartRouter);
app.use('/api/category', catgoryRouter);
app.use("/api/response", responseRouter);

//error handling middleware

app.use((err, req, res, next) => { 
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

/*In simple terms, this code creates a backend 
server using Express, connects it to a MongoDB database, 
sets up routes for various API endpoints, and handles errors centrally. */