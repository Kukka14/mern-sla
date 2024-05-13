import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from './../../../images/logo2.png'; // Import your website logo
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from './../../../components/AdminHeader';
import { Link } from 'react-router-dom';



const ManageProfileReport = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('username'); // Default category

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedCategory, users]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
      setUserCount(response.data.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter(user => {
      const categoryValue = user[selectedCategory].toLowerCase();
      return categoryValue.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
  
    // Logo
    const imgData = logo;
    const logoWidth = 80;
    const logoHeight = 30;
    doc.addImage(imgData, 'PNG', 10, 10, logoWidth, logoHeight);
  
    // Title
    doc.setFontSize(25);
    doc.setFont('bold');
    doc.text('Registered Users Report', 165, 25, { align: 'center' });
  
    // Total Users
    doc.setFontSize(18); // Increment font size
    doc.setFont('bold');
    doc.text(`The number of users currently logged in: ${userCount}`, 10, 50); // Display total users at the top
  
    // Table
    doc.autoTable({
      startY: 60,
      head: [['List', 'ID', 'Username', 'Email']],
      body: filteredUsers.map((user, index) => [index + 1, user._id, user.username, user.email]),
    });
  
    // Download time and date
    const currentDate = new Date();
    const downloadDate = currentDate.toLocaleDateString();
    const downloadTime = currentDate.toLocaleTimeString();
    doc.setFontSize(12); // Decrease font size
    doc.text(`Date and Time :${downloadDate} at ${downloadTime}`, 10, doc.lastAutoTable.finalY + 10, { align: 'left' }); // Align to the left
  
    // Admin signature
    doc.text('Admin Signature:', 165, doc.lastAutoTable.finalY + 20, { align: 'right' }); // Align to the right
    doc.setLineWidth(0.5);
    doc.line(165, doc.lastAutoTable.finalY + 25, 250, doc.lastAutoTable.finalY + 25); // Display line
  
    doc.save('user_report.pdf');
  };
  
  return (
    <div className='flex h-screen'>

      {/* Sidebar */}
      <div className='bg-sideNavBackground w-1/5 p-4'>

        {/* Logo */}
        <Link to="/mainDashboard">
       <div className='flex justify-center items-center mb-8'>
          <img src={logo} alt="Company Logo" className='w-48 h-auto'/>
        </div>   
       </Link>
        
        {/* Separate Line */}
        <hr className="border-gray-700 my-4"/>

        {/* Navigation */}
        <div className='space-y-1'>
          <NavLink icon={dashboard} text="Main Dashboard" to="/customerDashBoard" />
          <NavLink icon={dashboard} text="Manage Profile" to="/customer-management" />
          
          
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1'>

        {/* Header */}
        <AdminHeader />

        {/* Main Content Area */}
        <div className='p-8'></div>
       
    <div style={{ backgroundColor: '#F1F2EB', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <h1 className='text-3xl font-semibold'>Registered Users Report</h1>
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', marginRight: '10px', width: '70%' }}
          />
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', width: '30%' }}>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </div>
        <button onClick={handleDownloadReport} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
          Download Report (PDF)
        </button>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Total Users: {userCount}</p>
        </div>

      <div className=" rounded-lg">
        <table className="table-auto w-11/12 bg-white shadow-md rounded ">
          <thead>
            <tr className= "bg-green-300">
              <th className="px-4 py-2">List</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? "bg-green-100" : "bg-green-200"}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user._id}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
    </div>
      </div>
  );
};

export default ManageProfileReport;

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
      <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
      <span className='text-lg font-semibold'>{text}</span>
    </Link>
  );
}