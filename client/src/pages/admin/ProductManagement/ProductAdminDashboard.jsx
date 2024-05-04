import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

export default function MainDashboard() {
  const [itemCount, setItemCount] = useState(0); // State variable to store total item count
  const [itemCountByCategory, setItemCountByCategory] = useState({}); // State variable to store item counts by category

  useEffect(() => {
    // Fetch item count and item counts by category when component mounts
    fetchItemCount();
    fetchItemCountByCategory();
  }, []); // Empty dependency array to run effect only once when component mounts

  const fetchItemCount = async () => {
    try {
      const response = await axios.get('/api/listing/count');
      setItemCount(response.data.count); // Update total item count state
    } catch (error) {
      console.error('Error fetching item count:', error);
    }
  };

  const fetchItemCountByCategory = async () => {
    try {
      const response = await axios.get('/api/listing/countByCategory');
      setItemCountByCategory(response.data); // Update item counts by category state
    } catch (error) {
      console.error('Error fetching item count by category:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <img src={logo} alt="Company Logo" className="w-48 h-auto" />
        </div>
        {/* Separate Line */}
        <hr className="border-gray-700 my-4" />
        {/* Navigation */}
        <div className="space-y-1">
          <NavLink
            icon={dashboard}
            text="Main Dashboard"
            to="/product-admin-dashboard"
          />
          <NavLink
            icon={dashboard}
            text="Create Listing"
            to="/product-listing"
          />
          <NavLink icon={dashboard} text="View Products" to="/product-view" />
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />
        <div className="flex flex-col gap-10 mt-36">
          {/* Render cards for each category */}
          <div className="flex flex-wrap justify-center">
            {/* First card for total count of all products */}
           <Link to="/product-view">
           <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-64 shadow-lg h-40 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-4xl font-bold">
                <p>{itemCount}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">All Products</p>
            </div>
            </Link>
            {/* Render cards for each category */}
            {Object.entries(itemCountByCategory).map(([category, count]) => (
              <Link to={`/products/${category}`} key={category}>
                <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-64 shadow-lg h-40 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
                  <div className="text-4xl font-bold">
                    <p>{count}</p>
                  </div>
                  <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
                  <p className="text-sectiontext">{category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex items-center text-white py-2 px-4 rounded-md bg-sideNavButton hover:bg-sideNavButtonhover"
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
    </Link>
  );
}
