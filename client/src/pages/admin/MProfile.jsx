import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1 className='text-3xl font-semibold text-center my-7'>Admin Dashboard</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid black' }}>
              <th style={{ border: '3px solid black', padding: '20px' }}>ID</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>Username</th>
              <th style={{ border: '3px solid black', padding: '20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={{ border: '3px solid black', padding: '8px' }}>{user._id}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>{user.username}</td>
                <td style={{ border: '3px solid black', padding: '8px' }}>
                  <a href={`/profile/${user._id}`}>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                    >
                      Update
                    </button>
                  </a>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
