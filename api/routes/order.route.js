import express from 'express';
import {createOrder,getOrderDetails,getAllDeliveredOrders,getNewOrders,getAllOrders,searchOrder} from '../controllers/order.controller.js';

const router = express.Router();




router.post("/create",createOrder);
router.get("/get/:orderId",getOrderDetails);
router.get('/delivered', getAllDeliveredOrders);
router.get('/new', getNewOrders);
router.get('/all', getAllOrders);
router.get('/search', searchOrder);



export default router;