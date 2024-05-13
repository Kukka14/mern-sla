import mongoose from "mongoose";

const sproductSchema = new mongoose.Schema(
    {
        Supplier_Name:{
            type: String,
            required: true,
        },
        Product_Name:{
            type: String,
            required: true,
        },

        Product_Category:{
            type: String,
            required: true,
        },

        Supplier_Price:{
            type: Number,
            required: true,
        },
        Quantity:{
            type: Number,
            required: true,
        },
    }, {timestamps: true}
);

const Sproduct = mongoose.model('Sproduct' ,sproductSchema)

export default Sproduct;