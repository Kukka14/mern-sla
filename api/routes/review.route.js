import express from 'express';
import { add, getAllReviews, updateReview, deleteReview, getUserReviewsById } from '../controllers/review.controller.js';

const router = express.Router();


router.get('/', getAllReviews);
router.post('/addReview', add);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/:userId', getUserReviewsById);

export default router;


//sets up routes for handle various CRUD operations