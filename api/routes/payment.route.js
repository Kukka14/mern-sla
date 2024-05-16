import express from 'express'

import { getCheckoutSession,getAllPayments,deletePayment,getUserPayments,getpayments } from '../controllers/payment.controller.js'

const router = express.Router()

router.post('/checkout',getCheckoutSession);
router.get('/all', getAllPayments);
router.delete('/delete/:paymentId', deletePayment);
router.post('/paymentdetails', getUserPayments);
router.get('/data',getpayments)


export default router;