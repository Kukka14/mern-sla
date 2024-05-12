import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from './../../../images/logo2.png';
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from './../../../components/AdminHeader';

const ManageDashboard = ({ userCount }) => {
  const [deleteCount, setDeleteCount] = useState(0);
  const [averagePercentage, setAveragePercentage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/admin/user-stats');
      const { deleteCount, averageCount } = response.data;
      setDeleteCount(deleteCount);
      calculateAveragePercentage(userCount, averageCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateAveragePercentage = (userCount, averageCount) => {
    if (userCount !== 0) {
      const percentage = (averageCount / userCount) * 100;
      setAveragePercentage(percentage.toFixed(2));
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
          <NavLink icon={dashboard} text="Main Dashboard" to="/customerDashBoard" />
          {/* Linking to Manage Profile page with user count */}
          <NavLink icon={dashboard} text="Manage Profile" to="/customer-management" />
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        {/* Header */}
        <AdminHeader />
        {/* Main Content Area */}
        <div className='p-8'>
          {/* Your main content goes here */}
          <div className='flex justify-around'>
            {/* Linking to Manage Profile page with different statistics */}
            <Link to="/customer-management" className="text-decoration-none">
              <UserStatistics title="Current Users" count={userCount} />
            </Link>
            <Link to="/customer-management" className="text-decoration-none">
              <UserStatistics title="Deleted Users" count={deleteCount} />
            </Link>
            <Link to="/customer-management" className="text-decoration-none">
              <UserStatistics title="Average Users (%)" count={averagePercentage} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDashboard;

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md bg-sideNavButton hover:bg-sideNavButtonhover '>
      <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
      <span className='text-lg font-semibold'>{text}</span>
    </Link>
  );
}

// UserStatistics component
function UserStatistics({ title, count }) {
  return (
    <div className="bg-green-200 rounded-md p-4 text-center w-3/3 mr-4 cursor-pointer">
      <p className="text-2xl font-semibold text-green-900">{title}</p>
      <p className="text-xl">{count}</p>
    </div>
  );
}
