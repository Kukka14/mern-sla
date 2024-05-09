import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
    {
        fname:{
            type: String,
            required: true,
        },
        lname:{
            type: String,
            required: true,
        },
        Supplier_Email:{
            type: String,
            required: true,
            
        },
        nic:{
            type: Number,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        phone:{
            type: Number,
            required: true,
        },
    }, {timestamps: true}
);

const Supplier = mongoose.model('Supplier' ,supplierSchema)

export default Supplier;