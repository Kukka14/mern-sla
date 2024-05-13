import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";
import Chart from "chart.js/auto";

export default function CategoryAdminDashboard() {
  const [categoryCount, setCategoryCount] = useState(0);
  const [couponCount, setCouponCount] = useState(0);
  const [discountCount, setDiscountCount] = useState(0);
  const [itemCountByCategory, setItemCountByCategory] = useState({});
  const [chartInstance, setChartInstance] = useState(null); 

  useEffect(() => {
    // Fetch item count and item counts by category when component mounts
    fetchCategoryCount();
    fetchCouponCount();
    fetchItemCountByCategory();
    fetchDicountCount();
  }, []);

  const fetchCategoryCount = async () => {
    try {
      const response = await axios.get("/api/category/count");
      setCategoryCount(response.data.count); // Update total item count state
    } catch (error) {
      console.error("Error fetching item count:", error);
    }
  };

  const fetchItemCountByCategory = async () => {
    try {
      const response = await axios.get("/api/listing/countByCategory");
      setItemCountByCategory(response.data); // Update item counts by category state
    } catch (error) {
      console.error("Error fetching item count by category:", error);
    }
  };

  const fetchCouponCount = async () => {
    try {
      const response = await axios.get("/api/coupon/count");
      setCouponCount(response.data.count); // Update total item count state
    } catch (error) {
      console.error("Error fetching item count:", error);
    }
  };

  const fetchDicountCount = async () => {
    try {
      const response = await axios.get("/api/discount/count");
      setDiscountCount(response.data.count); // Update total item count state
    } catch (error) {
      console.error("Error fetching item count:", error);
    }
  };

  useEffect(() => {
    // Function to render bar chart
    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy previous chart instance if it exists
      }

      const ctx = document.getElementById("categoryChart").getContext("2d");
      const categories = Object.keys(itemCountByCategory);
      const counts = Object.values(itemCountByCategory);

      // Define the colors
      const lightGreenColor = "rgba(144, 238, 144, 0.6)";
      const darkGreenColor = "rgba(0, 100, 0, 0.6)";
      const darkerGreenColor = "rgba(0, 100, 0, 0.6)"; // Adjusted for a darker shade

      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: categories,
          datasets: [
            {
              label: "Category Count",
              data: counts,
              backgroundColor: lightGreenColor,
              borderColor: darkerGreenColor, // Use the darker color for borders
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance); // Set the new chart instance
    };

    renderChart(); // Call the function to render the chart
  }, [itemCountByCategory]);

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
        <div className="space-y-1">
          <NavLink
            icon={dashboard}
            text="Main Dashboard"
            to="/category-admin-dashboard"
          />
          <NavLink icon={dashboard} text="Add Category" to="/addcategories" />
          <NavLink icon={dashboard} text="View Category" to="/viewcategories" />
          <NavLink icon={dashboard} text="Add Discount" to="/adddiscount" />
          <NavLink icon={dashboard} text="View Discount" to="/viewdiscount" />
          <NavLink icon={dashboard} text="Create Coupon" to="/couponadd" />
          <NavLink icon={dashboard} text="View Coupon" to="/couponcodeview" />
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Main Content Area */}
        <div className="p-8">
          <div className="flex flex-row justify-around">
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-56 shadow-lg h-50 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{categoryCount}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">All Category</p>
            </div>
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-56 shadow-lg h-50 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{couponCount}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">All Coupon</p>
            </div>
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-56 shadow-lg h-50 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{discountCount}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">All Discount</p>
            </div>
          </div>
          <div className="flex justify-center ml-8 items-center mt-16 w-11/12">
            <div className="w-9/12 h-1/2 mb-8 mt-20 ml-auto mr-auto justify-center items-center">
              <canvas id="categoryChart" width="400" height="200"></canvas>
            </div>
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
      className="flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover "
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
    </Link>
  );
}
