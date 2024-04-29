import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this review?</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const MyReview = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/review/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setReviews(data);
          setLoading(false);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to fetch reviews');
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  const handleDeleteReview = async (reviewId) => {
    setReviewToDelete(reviewId);
  };

  const confirmDeleteReview = async () => {
    try {
      const response = await fetch(`/api/review/${reviewToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== reviewToDelete));
      } else {
        throw new Error('Failed to delete review');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setReviewToDelete(null);
    }
  };

  const cancelDeleteReview = () => {
    setReviewToDelete(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && reviews.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="bg-green-500">
                <th className="px-4 py-2 border border-gray-300">Comment</th>
                <th className="px-4 py-2 border border-gray-300">Rating</th>
                <th className="px-4 py-2 border border-gray-300">Images</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review._id}>
                  <td className="px-4 py-2 border border-gray-300">{review.comment}</td>
                  <td className="px-4 py-2 border border-gray-300">{review.rating}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {review.imageUrls && (
                      <div className="flex">
                        {review.imageUrls.map(image => (
                          <img
                            key={image}
                            src={image}
                            alt="Review Image"
                            className="w-24 h-24 mr-2 rounded"
                          />
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/review/${review._id}/update`}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && reviews.length === 0 && (
        <p className="text-gray-600">No reviews found.</p>
      )}

      {/* Confirmation modal for delete review */}
      <ConfirmationModal
        isOpen={reviewToDelete !== null}
        onCancel={cancelDeleteReview}
        onConfirm={confirmDeleteReview}
      />
    </div>
  );
};

export default MyReview;
