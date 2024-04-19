import express from 'express';
import { add, signin } from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/addEmployee', add);
router.post('/signin', signin);

export default router;