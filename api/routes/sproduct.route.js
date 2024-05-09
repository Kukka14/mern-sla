import express from 'express';
import { createSproduct,getAllProducts,getProductById,deleteProductById,updateSproduct } from '../controllers/sproduct.controller.js';

const router = express.Router();

router.post('/add' , createSproduct);
router.get("/getall", getAllProducts); // Retrieve all products
router.get("/getdetails/:id", getProductById); // Retrieve a single product by I
router.delete('/delete/:id', deleteProductById);
router.put('/update/:id', updateSproduct);


export default router;

