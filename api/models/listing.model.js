import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }, 
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;