import express from 'express';
import { add, getAllCategories } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/addCategory', add);
router.get('/getAllCategories', getAllCategories);

export default router;
