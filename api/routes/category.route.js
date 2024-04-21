import express from 'express';
import { add } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/addCategory', add);

export default router;