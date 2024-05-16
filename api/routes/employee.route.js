import express from 'express';
import { add, signin, get, update, deleteEmp } from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/addEmployee', add);
router.get('/', get);
router.put('/:id', update);
router.delete('/:id', deleteEmp);

router.post('/signin', signin);

export default router;