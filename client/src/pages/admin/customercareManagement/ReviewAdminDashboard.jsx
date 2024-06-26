import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminHeader from './../../../components/AdminHeader';
import logo from './../../../images/logo2.png'; 
import dashboard from './../../../images/icons8-arrow-50 (1).png';

export default function ReviewAdminDashboard() {
    const [totalReviews, setTotalReviews] = useState(0);
    const [adminRespondedReviews, setAdminRespondedReviews] = useState(0);
    const [adminPendingReviews, setAdminPendingReviews] = useState(0);
    const [overallRating, setOverallRating] = useState(0);

    useEffect(() => {
        fetchReviewData();
    }, []);

    const fetchReviewData = async () => {
        try {
            // Fetch total number of reviews
            const totalResponse = await axios.get('/api/review/total');
            setTotalReviews(totalResponse.data.total);

            // Fetch number of reviews that admin has responded to
            const respondedResponse = await axios.get('/api/review/admin/responded');
            setAdminRespondedReviews(respondedResponse.data.total);

            // Fetch number of reviews that admin has to respond to
            const pendingResponse = await axios.get('/api/review/admin/pending');
            setAdminPendingReviews(pendingResponse.data.total);

            // Fetch overall rating
            const ratingResponse = await axios.get('/api/review/overallRating');
            setOverallRating(ratingResponse.data.averageRating);
        } catch (error) {
            console.error('Error fetching review data:', error);
        }
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

                {/* Main Content Area */}
                <div className='p-8'>
                  <h2 className="text-2xl font-bold mb-4">Review Admin Dashboard</h2>
                    <p style={{ color: 'blue', fontSize: '18px' }}>Total Number of Reviews: {totalReviews}</p>
                    <p style={{ color: 'green', fontSize: '18px' }}>Number of Reviews Admin Responded To: {adminRespondedReviews}</p>
                    <p style={{ color: 'red', fontSize: '18px' }}>Number of Reviews Admin has to Respond To: {adminPendingReviews}</p>
                    <p style={{ color: 'purple', fontSize: '18px' }}>Overall Rating: {overallRating}</p>
                </div>
            </div>
        </div>
    )
}

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
    return (
        <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
            <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
            <span className='text-lg font-semibold'>{text}</span>
        </Link>
    );
}
