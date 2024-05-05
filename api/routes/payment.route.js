import express from 'express'

import { getCheckoutSession } from '../controllers/payment.controller.js'

const router = express.Router()

router.post('/checkout',getCheckoutSession);


export default router;