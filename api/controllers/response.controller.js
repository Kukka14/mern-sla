import Response from '../models/response.model.js';

// Controller function to add a response to a review
export const addResponseToReview = async (req, res, next) => {
  try {
    const { reviewId, response } = req.body;

    // Create a new response document
    const newResponse = new Response({
      reviewId,
      response,
    });

    // Save the response to the database
    const savedResponse = await newResponse.save();

    res.status(201).json({ success: true, data: savedResponse });
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
