import express from 'express';
import { add, getAllReviews, updateReview, deleteReview } from '../controllers/review.controller.js';

const router = express.Router();


router.get('/', getAllReviews);
router.post('/addReview', add);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;