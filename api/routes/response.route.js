import express from 'express';
import { addResponseToReview } from '../controllers/response.controller.js';

const router = express.Router();

// POST route to add a response to a review
router.post('/', addResponseToReview);

export default router;
