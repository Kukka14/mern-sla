import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from './../../../images/logo2.png'; 
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from './../../../components/AdminHeader';

const ReviewListingPage = () => {
    const [reviews, setReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchNotFound, setSearchNotFound] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null); // Track the review to delete

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        handleSearch(); // Trigger search when searchQuery changes
    }, [searchQuery]); // This will run every time searchQuery changes

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/review');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleDelete = async (id) => {
        // Set the review to delete when delete button is clicked
        setReviewToDelete(id);
    };

    const confirmDeleteReview = async () => {
        try {
            await axios.delete(`/api/review/${reviewToDelete}`);
            setReviews(reviews.filter(review => review._id !== reviewToDelete));
        } catch (error) {
            console.error('Error deleting review:', error);
        } finally {
            setReviewToDelete(null); // Reset the review to delete
        }
    };

    const cancelDeleteReview = () => {
        setReviewToDelete(null); // Reset the review to delete
    };

    const handleSearch = () => {
        const results = reviews.filter(review => review.rating === parseInt(searchQuery));
        setSearchResults(results);
        setSearchNotFound(results.length === 0);
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
                    <NavLink icon={dashboard} text="View Reviews" to="/reviewlisting" />
                    <NavLink icon={dashboard} text="Add Respond" to="/admin-responses" />
                    {/* Add more navigation items as needed */}
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1'>
                {/* Header */}
                <AdminHeader />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Review Listing</h1>
                    <div className="flex justify-end">
                        <Link to="/admin-responses" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Respond to Reviews</Link>
                        <Link to="/reviewreport" className="bg-blue-500 text-white px-4 py-2 rounded ml-4 hover:bg-blue-600">Generate Report</Link>
                    </div>
                    {/* Search input field */}
                    <div className="flex justify-center mb-4">
                        <input
                            type="number"
                            placeholder="Search by rating (1-5)..."
                            min="1"
                            max="5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded"
                        />
                         <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Search</button>                    </div>
                    {/* Display search results or all reviews */}
                    <div className="overflow-x-auto">
                        {/* {searchNotFound && (
                            <p className="text-red-500 text-center mb-4">Search result not found</p>
                        )} */}
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-green-500">
                                    <th className="px-4 py-2">Comment</th>
                                    <th className="px-4 py-2">Rating</th>
                                    <th className="px-4 py-2">Images</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.length > 0 ? searchResults.map(review => (
                                    <tr key={review._id}>
                                        <td className="border px-4 py-2">{review.comment}</td>
                                        <td className="border px-4 py-2">{review.rating}</td>
                                        <td className="border px-4 py-2">
                                            {review.imageUrls && Array.isArray(review.imageUrls) && review.imageUrls.map(url => (
                                                <img key={url} src={url} alt="Review" className="w-24 h-24 object-cover mr-2" />
                                            ))}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button onClick={() => handleDelete(review._id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">Delete</button>
                                        </td>
                                    </tr>
                                )) : reviews.map(review => (
                                    <tr key={review._id}>
                                        <td className="border px-4 py-2">{review.comment}</td>
                                        <td className="border px-4 py-2">{review.rating}</td>
                                        <td className="border px-4 py-2">
                                            {review.imageUrls && Array.isArray(review.imageUrls) && review.imageUrls.map(url => (
                                                <img key={url} src={url} alt="Review" className="w-24 h-24 object-cover mr-2" />
                                            ))}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button onClick={() => handleDelete(review._id)} className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Confirmation modal for delete review */}
                    {reviewToDelete && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <p className="text-lg font-semibold mb-4">Are you sure you want to delete this review?</p>
                                <div className="flex justify-end">
                                    <button onClick={confirmDeleteReview} className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded mr-2">Yes</button>
                                    <button onClick={cancelDeleteReview} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 text-gray-800 rounded">No</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewListingPage;

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
