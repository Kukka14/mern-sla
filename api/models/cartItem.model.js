// models/CartItem.js
import {mongoose,Schema }from 'mongoose';

// Define cart item schema
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true
    },
    product: {
        type: String, 
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 
    },
    price: {
        type: Number,
        required: true
    }
});


const CartItem = mongoose.model('cartitems', cartItemSchema);


export default CartItem;