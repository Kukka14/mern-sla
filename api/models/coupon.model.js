import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    discountAmount: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ['active', 'reactive'],
        default: 'active'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
        default: []
    }],
  },
  { timestamps: true }
);

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
