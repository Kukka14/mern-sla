import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    pprice: {
        type: Number,
        required: true,
    },
    poffer: {
        type: Number,
        required: true,
    },
    sale: {
        type: Boolean,
        required: true,
    },
    preOrder: {  
        type: Boolean,
        required: true,
    },
    rent: {
        type: Boolean,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },

    images: {
        type: Array,
        required: true,
    },

}, {timestamps: true}
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;