import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import logo from './../../../images/logo2.png'; 
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from './../../../components/AdminHeader';

const ReviewAdminDashboard = () => {
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setReviewCount] = useState(0);
    const [ratingDistribution, setRatingDistribution] = useState({});
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        calculateRatingDistribution();
    }, [reviews]); // Recalculate rating distribution whenever reviews change

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/review');
            setReviews(response.data);
            setReviewCount(response.data.length);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const calculateRatingDistribution = () => {
        const distribution = {};
        let totalScore = 0;
        let totalCount = 0;
        reviews.forEach(review => {
            const rating = review.rating;
            distribution[rating] = distribution[rating] || { count: 0, totalScore: 0 };
            distribution[rating].count += 1;
            distribution[rating].totalScore += review.ratingDecimal || review.rating; // Assuming there's a field named ratingDecimal for the decimal score
            totalScore += review.ratingDecimal || review.rating;
            totalCount++;
        });
        setRatingDistribution(distribution);
        setAverageRating(totalCount > 0 ? totalScore / totalCount : 0);
    };

    const handleGenerateReport = () => {
        window.location.href = '/reviewreport';
    };

    const handleRespondToReviews = () => {
        window.location.href = '/admin-responses';
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
                <div className='p-8'>
                    <h2 className='text-3xl font-bold text-center my-7'>Review Details
                        <hr className="w-1/3 mx-auto border-b-2 border-green-600 my-3"  />
                    </h2>
                    {/* Total reviews and average rating */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-200 rounded-md p-4 text-center w-1/3 mr-4">
                            <p className="text-2xl font-semibold text-green-900">Total Reviews</p>
                            <p className="text-3xl font-bold text-green-900">{totalReviews}</p>
                        </div>
                        <div className="bg-green-200 rounded-md p-4 text-center w-1/3">
                            <p className="text-2xl font-semibold text-green-900">Average Rating</p>
                            <p className="text-3xl font-bold text-green-900">{averageRating.toFixed(1)}</p>
                        </div>
                    </div>
                    {/* Rating distribution summary */}
                    <div className="mt-16 ml-40 w-3/4">
                        <h3 className="text-2xl font-semibold text-balance mb-4">Rating Distribution</h3>
                        <div className="flex flex-col place-items-baseline space-y-2">
                            {Object.entries(ratingDistribution)
                                .sort(([ratingA], [ratingB]) => Number(ratingB) - Number(ratingA))
                                .map(([rating, { count, totalScore }]) => (
                                    <div key={rating} className="flex items-center">
                                        <div className="w-10 text-lg font-semibold">{rating}</div>
                                        <span role="img" aria-label="Star" className="ml-1">⭐</span>
                                        <div className="w-48 h-2 bg-gray-300 mb-2 rounded-e-lg overflow-hidden ml-1">
                                            <div className="h-full bg-yellow-500" style={{ width: `${(count / Object.values(ratingDistribution).reduce((acc, curr) => Math.max(acc, curr.count), 0)) * 70}%` }}></div>
                                        </div>
                                        <div className="text-sm text-gray-600 ml-2">{count}</div>
                                    </div>
                            ))}
                        </div>
                    </div>
                    {/* Buttons: Generate Report and Respond to Reviews */}
                    <div className="flex justify-end">
                        <button onClick={handleGenerateReport} className="bg-blue-600 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700">
                            Generate Report
                        </button>
                        <button onClick={handleRespondToReviews} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Respond to Reviews
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
    return (
        <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
            <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
            <span className='text-lg font-semibold'>{text}</span>
        </Link>
    );
}

export default ReviewAdminDashboard;
