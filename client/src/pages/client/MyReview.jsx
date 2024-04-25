import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyReview = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && reviews.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Comment</th>
                <th className="px-4 py-2 border border-gray-300">Rating</th>
                <th className="px-4 py-2 border border-gray-300">Images</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && reviews.length === 0 && (
        <p className="text-gray-600">No reviews found.</p>
      )}
    </div>
  );
};

export default MyReview;
