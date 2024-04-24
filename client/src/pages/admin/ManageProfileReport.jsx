import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../../images/logo2.png'; // Import your website logo

const ManageProfileReport = () => {
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

  const handleDownloadReport = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
// Logo
const imgData = logo; // Use your imported logo
const logoWidth = 80; // Set the desired width of the logo
const logoHeight = 30; // Set the desired height of the logo
doc.addImage(imgData, 'PNG', 10, 10, logoWidth, logoHeight);


    // Title
doc.setFontSize(25);
doc.setFont('bold');
doc.text('Registered Users Report', 165, 25, { align: 'center' });


    // Table
    doc.autoTable({
      startY: 60,
      head: [['List', 'ID', 'Username', 'Email']],
      body: users.map((user, index) => [index + 1, user._id, user.username, user.email]),
    });

    doc.save('user_report.pdf');
  };

  return (
    <div style={{backgroundColor: '#fffff', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
         
          <h1 className='text-3xl font-semibold'>Registered Users Report</h1>
        </div>
        <button onClick={handleDownloadReport} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
          Download Report (PDF)
        </button>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid black' }}>
              <th style={{ border: '3px solid black', padding: '20px' }}>List</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>ID</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>Username</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td style={{ border: '3px solid black', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>{user._id}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>{user.username}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Total Users: {userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ManageProfileReport;
