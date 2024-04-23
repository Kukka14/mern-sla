import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    avatar: {
        type: String, 
        required: true,
    }
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);

export default Category;