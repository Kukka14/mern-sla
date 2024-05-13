import mongoose from 'mongoose';

const reveiwSchema = new mongoose.Schema({

    comment:{
        type: String,
        required:true,
    },
    
    //add ratings
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Assuming a rating scale from 1 to 5 stars
    },
    imageUrls: {
        type: Array, // Store image URL in MongoDB
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    }, {timestamps: true}
);

const Review = mongoose.model('Review', reveiwSchema);

export default Review;