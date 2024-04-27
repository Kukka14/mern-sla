import express from 'express';
import {createOrder,getOrderDetails,getAllDeliveredOrders,getNewOrders,getAllOrders,searchOrder,deleteOrder,updatePaymentStatus,updateTrackingStatus} from '../controllers/order.controller.js';

const router = express.Router();




router.post("/create",createOrder);
router.get("/get/:orderId",getOrderDetails);
router.get('/delivered', getAllDeliveredOrders);
router.get('/new', getNewOrders);
router.get('/all', getAllOrders);
router.get('/search', searchOrder);
router.delete('/delete/:orderId', deleteOrder);
router.put('/update-payment-status/:orderId', updatePaymentStatus);
router.put('/update-tracking-status/:orderId', updateTrackingStatus);



export default router;