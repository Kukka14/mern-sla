import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./../../../images/logo2.png";
import dashboard from "./../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "./../../../components/AdminHeader";
import { Link } from "react-router-dom";

const ManageProfile = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("username"); // Default category

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedCategory, users]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setUsers(response.data);
      setUserCount(response.data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      const categoryValue = user[selectedCategory].toLowerCase();
      return categoryValue.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      setUserCount(users.length - 1);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleGenerateReport = () => {
    window.location.href = "/customer-report";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}

        <Link to="/mainDashboard">
          <div className="flex justify-center items-center mb-8">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </div>
        </Link>

        {/* Separate Line */}
        <hr className="border-gray-700 my-4" />

        {/* Navigation */}
        <div className='space-y-1'>
          <NavLink icon={dashboard} text="Main Dashboard" to="/managerUI" />
          <NavLink icon={dashboard} text="Manage Profile" to="/customer-management" />
          
          
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Main Content Area */}
        <div className='p-8'></div>
       
      


    <div style={{ backgroundColor: '#F1F2EB', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className='text-3xl font-semibold text-center my-7'>User Details</h1>
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

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                Total Users: {userCount}
              </p>
            </div>

        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid black', backgroundColor: '#10b981' }}>
              <th style={{ border: '1px solid black', padding: '20px', color: 'black', backgroundColor: '#10b981' }}>List</th>
              <th style={{ border: '1px solid black', padding: '20px', color: 'black', backgroundColor: '#10b981' }}>ID</th>
              <th style={{ border: '1px solid black', padding: '20px', color: 'black', backgroundColor: '#10b981' }}>Username</th>
              <th style={{ border: '1px solid black', padding: '20px', color: 'black', backgroundColor: '#10b981' }}>Email</th>
              <th style={{ border: '1px solid black', padding: '20px', color: 'black', backgroundColor: '#10b981' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} style={{ backgroundColor: index % 2 === 0 ? '#fffffff' : '#e7e5e4' }}>
                <td style={{ border: '1px solid black', padding: '8px', color: 'black' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', padding: '8px', color: 'black' }}>{user._id}</td>
                <td style={{ border: '1px solid black', padding: '8px', color: 'black' }}>{user.username}</td>
                <td style={{ border: '1px solid black', padding: '8px', color: 'black' }}>{user.email}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
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

export default ManageProfile;

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover "
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
    </Link>
  );
}
