import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ReviewListingPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/review');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/review/${id}`);
            setReviews(reviews.filter(review => review._id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleEdit = (id) => {
        // Implement edit functionality here
        console.log(`Edit review with ID: ${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Review Listing</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Comment</th>
                            <th className="px-4 py-2">Rating</th>
                            <th className="px-4 py-2">Images</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review._id}>
                                <td className="border px-4 py-2">{review.comment}</td>
                                <td className="border px-4 py-2">{review.rating}</td>
                                <td className="border px-4 py-2">
                                {review.imageUrl && Array.isArray(review.imageUrl) && review.imageUrl.map(url => (
                                     <img key={url} src={url} alt="Review" className="w-24 h-24 object-cover mr-2" />
                                ))}
                                </td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => handleDelete(review._id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">Delete</button>
                                    <Link to={`/review/${review._id}/update`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewListingPage;
