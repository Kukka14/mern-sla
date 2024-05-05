import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './../../../images/logo2.png';
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from './../../../components/AdminHeader';
import { Link } from 'react-router-dom';

const ManagerUIPage = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
      setUserCount(response.data.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleGenerateReport = () => {
    window.location.href = '/customer-report';
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
          <NavLink icon={dashboard} text="Main Dashboard" to="/product-admin-dashboard" />
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
          <div style={{ backgroundColor: '#F1F2EB', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
         
              <h1 className='text-3xl font-semibold text-center my-7'>The Number Of Registered Users</h1>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Total : {userCount}</p>
              </div>
              <div>
                <button onClick={handleGenerateReport} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px', borderRadius: '5px', border: 'none' }}>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerUIPage;

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
      <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
      <span className='text-lg font-semibold'>{text}</span>
    </Link>
  );
}
