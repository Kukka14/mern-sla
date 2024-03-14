import express from 'express';
import { contactus } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/contactus', contactus);

export default router;

