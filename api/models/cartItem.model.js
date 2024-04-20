// models/CartItem.js
import {mongoose,Schema }from 'mongoose';

// Define cart item schema
const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true
    },
    p_imageUrls: [{
        type: String, 
        required: true
    }],

    p_name: {
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


const CartItem = mongoose.model('CartItem', cartItemSchema);


export default CartItem;