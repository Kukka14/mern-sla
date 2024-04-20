import express from 'express';
import { add } from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/addContact', add);

export default router;