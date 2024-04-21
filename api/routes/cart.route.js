
import { Router } from 'express';
const router = Router();
import { addToCart,checkoutcart,getCart,removeFromCart,updateCartItemQuantity } from '../controllers/cart.controller.js';


router.post('/addToCart', addToCart);
router.patch('/updateQuantity/:userId/:itemId', updateCartItemQuantity);
router.delete('/remove-from-cart/:userId/:itemId', removeFromCart);
router.post('/get', getCart);
router.post('/checkout',checkoutcart);

export default router;