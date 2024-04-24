import express from 'express'
import { verifyToken } from '../utils/verifyUser.js' 
import { getCheckoutSession } from '../controllers/payment.controller.js'

const router = express.Router()

router.post('/checkout-session',verifyToken,getCheckoutSession)


export default router;