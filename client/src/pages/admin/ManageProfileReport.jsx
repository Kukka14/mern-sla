import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../../images/logo2.png'; // Import your website logo

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
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid black', backgroundColor: '#443F82' }}>
              <th style={{ border: '3px solid black', padding: '20px', color: 'white', backgroundColor: '#443F82' }}>List</th>
              <th style={{ border: '3px solid black', padding: '20px', color: 'white', backgroundColor: '#443F82' }}>ID</th>
              <th style={{ border: '3px solid black', padding: '20px', color: 'white', backgroundColor: '#443F82' }}>Username</th>
              <th style={{ border: '3px solid black', padding: '20px', color: 'white', backgroundColor: '#443F82' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} style={{ backgroundColor: index % 2 === 0 ? '#fffffff' : '#D5D4E3' }}>
                <td style={{ border: '3px solid black', padding: '8px', color: 'black' }}>{index + 1}</td>
                <td style={{ border: '3px solid black', padding: '8px', color: 'black' }}>{user._id}</td>
                <td style={{ border: '3px solid black', padding: '8px', color: 'black' }}>{user.username}</td>
                <td style={{ border: '3px solid black', padding: '8px', color: 'black' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProfileReport;
