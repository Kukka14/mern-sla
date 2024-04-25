import Review from "../models/review.model.js";

export const add = async (req, res, next) => {
    try {
        const addReview = await Review.create(req.body);
        return res.status(201).json(addReview);
      } catch (error) {
        next(error);
      }
};

export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    const { id } = req.params;
    const { comment, rating, imageUrl } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(id, { comment, rating, imageUrl }, { new: true });
        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        next(error);
    }
};