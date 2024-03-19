
import { Router } from 'express';
const router = Router();
import { addToCart,getCart } from '../controller/cart.controller.js';


router.post('/addToCart', addToCart);
// router.put('/updateCartItem/:itemId', updateCartItem);
// router.delete('/removeCartItem/:itemId', removeCartItem);
router.get('/getCart', getCart);

export default router;