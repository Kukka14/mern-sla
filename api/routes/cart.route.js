
import { Router } from 'express';
const router = Router();
import { addToCart,getCart,removeFromCart } from '../controllers/cart.controller.js';


router.post('/addToCart', addToCart);
// router.put('/updateCartItem/:itemId', updateCartItem);
router.delete('/remove-from-cart/:userId/:itemId', removeFromCart);
router.get('/cart', getCart);

export default router;