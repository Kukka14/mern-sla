import express from 'express';
import { addSupplier, deleteSupplierById, getAllSuppliers, getSupplierById, updateSupplier, getAllSupplierNames } from '../controllers/supplier.controller.js';

const router = express.Router();

router.post('/add' , addSupplier);
router.get("/getall", getAllSuppliers); 
router.get("/getdetails/:id", getSupplierById); 
router.delete('/delete/:id', deleteSupplierById);
router.put('/update/:id', updateSupplier);
router.get("/names", getAllSupplierNames);



export default router;


