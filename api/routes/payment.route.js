import express from 'express'

import { getCheckoutSession,getAllPayments,deletePayment } from '../controllers/payment.controller.js'

const router = express.Router()

router.post('/checkout',getCheckoutSession);
router.get('/all', getAllPayments);
router.delete('/delete/:paymentId', deletePayment);


export default router;