import express from 'express';
import {createOrder,getOrderDetails} from '../controllers/order.controller.js';

const router = express.Router();




router.post("/create",createOrder);
router.get("/get/:orderId",getOrderDetails);


export default router;