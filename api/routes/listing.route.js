import express from 'express';
import { createListing, getAllProduct, updateProduct, deleteProduct, getProductById } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', createListing)
router.get('/get/:id', getAllProduct);
router.post('/update/:id', updateProduct);
router.get('/:id', getProductById);

router.delete('/:id', deleteProduct);

export default router;