import express from 'express';
import { createListing, getAllProduct, updateProduct, deleteProduct, getProductById, getProduct, getAllListingsCount, getAllListingsCountByCategory, getProductByCategory } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


router.get('/count', getAllListingsCount); 

router.get('/countByCategory', getAllListingsCountByCategory);

router.post('/create', createListing)
router.get('/get/:id', getAllProduct);
router.post('/update/:id', updateProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);
router.get('/', getProduct);

router.get('/category/:categoryName', getProductByCategory);





export default router;