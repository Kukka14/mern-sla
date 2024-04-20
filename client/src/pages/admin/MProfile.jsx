import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const AdminDashboard = () => {
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

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setUserCount(users.length - 1);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDownloadReport = () => {
    const csvData = convertToCSV(users);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'user_report.csv');
  };

  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const user of data) {
      const values = headers.map(header => user[header]);
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  return (
    <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className='text-3xl font-semibold text-center my-7'>User Details</h1>
       
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid black' }}>
              <th style={{ border: '3px solid black', padding: '20px' }}>List</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>ID</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>Username</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td style={{ border: '3px solid black', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>{user._id}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>{user.username}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Total Users: {userCount}</p>
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button onClick={handleDownloadReport} className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2">
            Download User Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
