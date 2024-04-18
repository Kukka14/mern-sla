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
        address:{
            type: String,
            required: true,
        },
        nic:{
            type: Number,
            required: true,
            unique: true,
        },
        phone:{
            type: Number,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
    }, {timestamps: true}
);

const Listing = mongoose.model('Listing' ,supplierSchema)

export default Listing;