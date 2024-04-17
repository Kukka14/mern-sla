import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    customerID:{
        type:String,
        required:true,
        unique:true,
    },
    transactionID:{
        type:String,
        required:true,
        unique:true,
    },
    paymentAmount:{
        type:String,
        required:true,
    },
    paymentDate:{
        type:String,
        required:true,
    },
},{timestamps:true});

const Payment=mongoose.model('Payment',paymentSchema);

export default Payment;
