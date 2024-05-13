import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from './../../../images/logo2.png'; 
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from './../../../components/AdminHeader';

const AdminResponses = () => {
    const [reviews, setReviews] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

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

    const handleResponseChange = (index, value) => {
        const updatedReviews = [...reviews];
        updatedReviews[index].response = value;
        updatedReviews[index].errorMessage = ''; // Clear error message when response changes
        setReviews(updatedReviews);
    };

    const handleResponseSubmit = async (id, response, index) => {
        try {
            if (!response || !response.trim()) {
                const updatedReviews = [...reviews];
                updatedReviews[index].errorMessage = 'Please fillout the field.';
                setReviews(updatedReviews);
                return;
            }

            const res = await axios.post('/api/response', {
                reviewId: id,
                response: response.trim()
            });

            if (res.status === 201) {
                // Update the review with the response
                const updatedReviews = [...reviews];
                updatedReviews[index].response = response.trim();
                setReviews(updatedReviews);
                setShowPopup(true); // Show pop-up message
            } else {
                throw new Error('Failed to submit response.');
            }
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    const closePopup = () => {
        setShowPopup(false); // Close pop-up message
    };

    return (
        <div className='flex h-screen'>
            {/* Sidebar */}
            <div className='bg-sideNavBackground w-1/5 p-4'>
                {/* Logo */}
                <div className='flex justify-center items-center mb-8'>
                    <img src={logo} alt="Company Logo" className='w-48 h-auto'/>
                </div>
                
                {/* Separate Line */}
                <hr className="border-gray-700 my-4"/>

                {/* Navigation */}
                <div className='space-y-1'>
                    <NavLink icon={dashboard} text="Main Dashboard" to="/reviewadmin" />
                    <NavLink icon={dashboard} text="View reviews" to="/reviewlisting" />
                    <NavLink icon={dashboard} text="Add Respond" to="/admin-responses" />
                    {/* Add more navigation items as needed */}
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1'>
                {/* Header */}
                <AdminHeader />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Admin Responses</h1>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-green-500">
                                    <th className="px-4 py-2">Comment</th>
                                    <th className="px-4 py-2">Admin Response</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review, index) => (
                                    <tr key={review._id}>
                                        <td className="border px-4 py-2">{review.comment}</td>
                                        <td className="border px-4 py-2">
                                            <textarea
                                                value={review.response || ''}
                                                onChange={(e) => handleResponseChange(index, e.target.value)}
                                                className="border px-2 py-1 w-full min-h-16" // Set min-height to 2 rows
                                            />
                                            {/* Error message near the text area */}
                                            {review.errorMessage && (
                                                <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded-sm text-sm">
                                                    {review.errorMessage}
                                                </div>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button onClick={() => handleResponseSubmit(review._id, review.response, index)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Submit Response</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pop-up message */}
                    {showPopup && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                                <p>Response submitted successfully!</p>
                                <button onClick={closePopup} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">OK</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminResponses;

function NavLink({ icon, text, to }) {
    return (
      <Link
        to={to}
        className="flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover "
      >
        <img src={icon} alt={text} className="w-6 h-6 mr-4" />
        <span className="text-lg font-semibold">{text}</span>
      </Link>
    );
}
