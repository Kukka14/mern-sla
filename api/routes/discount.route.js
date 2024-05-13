import express from 'express';
import { createDiscount, getAllDiscounts, updateDiscount, deleteDiscount, getAllDiscountCount } from '../controllers/discount.controller.js';


const router = express.Router();

router.get('/count', getAllDiscountCount);

router.post('/create', createDiscount);
router.get('/get', getAllDiscounts);
router.put('/update/:productId', updateDiscount);
router.delete('/delete/:productId', deleteDiscount);

export default router;