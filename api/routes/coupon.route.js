import express from 'express';
import { createCoupon, getAllCoupons, updateCouponStatus, getCouponById, updateCouponById, deleteCouponById, getAllCouponCount } from '../controllers/coupon.controller.js';

const router = express.Router();

router.get('/count', getAllCouponCount);

router.post('/create', createCoupon);
router.get('/', getAllCoupons);
router.put('/:id', updateCouponStatus);
router.get('/get/:id', getCouponById);
router.put('/update/:id', updateCouponById);
router.delete('/delete/:id', deleteCouponById);

export default router;
