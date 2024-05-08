import express from 'express';
import { addSupplier, deleteSupplierById, getAllSuppliers, getSupplierById, updateSupplier } from '../controllers/supplier.controller.js';

const router = express.Router();

router.post('/add' , addSupplier);
router.get("/getall", getAllSuppliers); 
router.get("/getdetails/:id", getSupplierById); 
router.delete('/delete/:id', deleteSupplierById);
router.put('/update/:id', updateSupplier);


export default router;


