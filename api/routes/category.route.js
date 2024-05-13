import express from 'express';
import { add, deleteCategory, getAllCategories, getAllCategoriesList, getCategoryById, updateCategory, getAllCategoriesCount } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/count', getAllCategoriesCount);

router.post('/addCategory', add);
router.get('/getAllCategories', getAllCategories);

router.get('/', getAllCategoriesList);
router.delete('/:id', deleteCategory);
router.post('/update/:id', updateCategory);
router.get('/:id', getCategoryById);



export default router;