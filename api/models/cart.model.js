import mongoose from 'mongoose';

// Define cart schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    total: {
        type: Number,
        default: 0
    }
    
});
// Create Cart model
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
