import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', // Reference to the Review model
    required: true
  },
  response: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Response = mongoose.model('Response', responseSchema);

export default Response;
