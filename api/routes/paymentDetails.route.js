import express from 'express';
import { getAllPayments,deletePayment,searchPaymentsByDate,getCheckoutSession} from '../controllers/paymentDetails.controller.js'
const router = express.Router();

const express = require('express');

import {getUserById} from '../controllers/user.controller.js'

router.get('/:userId', getUserById);


export default router;
