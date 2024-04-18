import express from 'express';
import { getAllUsers, updateUserByAdmin, deleteUserByAdmin } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users/:id', updateUserByAdmin);
router.delete('/users/:id', deleteUserByAdmin);

export default router;
