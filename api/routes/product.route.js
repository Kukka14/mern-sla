// Import necessary modules
import express from 'express';
import { getAllProducts,getProductById,test } from '../controller/product.contoller.js';


const router = express.Router();

router.get('/test',test)

router.get('/product-list', getAllProducts); 
router.get('/pdetails/:id', getProductById); 




export default router;
