import express from 'express';
import { Createsupplier, deleteSupplierById, getAllSuppliers, getSupplierById, updateSupplier } from '../controllers/supplier.controller.js';

const router = express.Router();

router.post('/add' , Createsupplier);
router.get("/getall", getAllSuppliers); // Retrieve all products
router.get("/getdetails/:id", getSupplierById); // Retrieve a single product by I
router.delete('/delete/:id', deleteSupplierById);
router.put('/update/:id', updateSupplier);


export default router;

