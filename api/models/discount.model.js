import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema(
  {

    productId: {
        type: String,
        required: true,
      },
    discountAmount: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

const Discount = mongoose.model('Discount', discountSchema);

export default Discount;