import express from 'express';
import { add, deleteCategory, getAllCategories, getAllCategoriesList, getCategoryById, updateCategory,  } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/addCategory', add);
router.get('/getAllCategories', getAllCategories);

router.get('/', getAllCategoriesList);
router.delete('/:id', deleteCategory);
router.post('/update/:id', updateCategory);
router.get('/:id', getCategoryById);
export default router;