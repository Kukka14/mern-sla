import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';



dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MangoDB');
}).catch((err)=> {
    console.log(err);
});

const app = express();

app.use(express.json());


app.use("/api/product",productRouter);
app.use('/api/cart', cartRouter);
app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
}); 
