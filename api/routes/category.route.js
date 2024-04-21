import express from 'express';
import { add, getAllCategories, getCategoryById, updateCategory, deleteCategory, getAllCategories } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/addCategory', add);
router.get('/', getAllCategories);
router.delete('/:id', deleteCategory);
router.post('/update/:id', updateCategory);
router.get('/:id', getCategoryById);

router.get('/getAllCategories', getAllCategories);

export default router;
