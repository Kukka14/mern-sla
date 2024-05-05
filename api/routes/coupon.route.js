import express from 'express';
import { createCoupon, getAllCoupons, updateCouponStatus, getCouponById, updateCouponById, deleteCouponById, applyCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();

router.post('/create', createCoupon);
router.get('/', getAllCoupons);
router.put('/:id', updateCouponStatus);
router.get('/get/:id', getCouponById);
router.put('/update/:id', updateCouponById);
router.delete('/delete/:id', deleteCouponById);
router.post('/apply', applyCoupon);

export default router;
