import express from 'express';
import { createCoupon, getAllCoupons, updateCouponStatus, getCouponById, updateCouponById } from '../controllers/coupon.controller.js';

const router = express.Router();

router.post('/create', createCoupon);
router.get('/', getAllCoupons);
router.put('/:id', updateCouponStatus);
router.get('/get/:id', getCouponById);
router.put('/update/:id', updateCouponById);

export default router;
