import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from './../../../images/logo2.png';
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from './../../../components/AdminHeader';

const ManageDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [averageCount, setAverageCount] = useState(0);
  const [deleteCount, setDeleteCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/admin/user-stats');
      setUserCount(response.data.userCount);
      setAverageCount(response.data.averageCount);
      setDeleteCount(response.data.deleteCount);
    } catch (error) {
      console.error('Error fetching data:', error);
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
          <NavLink icon={dashboard} text="Main Dashboard" to="/managerUI" />
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
            <div className='text-center'>
              <h2 className='text-3xl font-semibold'>Current Users</h2>
              <p className='text-xl'>{userCount}</p>
            </div>
            <div className='text-center'>
              <h2 className='text-3xl font-semibold'>Average Users</h2>
              <p className='text-xl'>{averageCount}</p>
            </div>
            <div className='text-center'>
              <h2 className='text-3xl font-semibold'>Deleted Users</h2>
              <p className='text-xl'>{deleteCount}</p>
            </div>
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
