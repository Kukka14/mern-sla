import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

export default function MainDashboard() {
  const [itemCount, setItemCount] = useState(0); // State variable to store total item count
  const [itemCountByCategory, setItemCountByCategory] = useState({}); // State variable to store item counts by category
  const [totalSproductCount, setTotalSproductCount] = useState({}); // State variable to store total Sproduct count
  const [chartInstance, setChartInstance] = useState(null); // State variable to store the chart instance

  useEffect(() => {
    // Fetch item count and item counts by category when component mounts
    fetchItemCount();
    fetchItemCountByCategory();
    fetchTotalSproductCount();
  }, []); // Empty dependency array to run effect only once when component mounts

  const fetchItemCount = async () => {
    try {
      const response = await axios.get("/api/listing/count");
      setItemCount(response.data.count); // Update total item count state
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

  const fetchTotalSproductCount = async () => {
    try {
      const response = await axios.get("/api/sproduct/categoryCounts");
      setTotalSproductCount(response.data); // Update total Sproduct count state
    } catch (error) {
      console.error("Error fetching Sproduct count:", error);
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
  }, [itemCountByCategory]); // Add itemCountByCategory as dependency

  const renderPieChart = () => {
    if (!chartInstance || !totalSproductCount) return; // Check if totalSproductCount is available
  
    const ctx = document.getElementById("categoryPieChart").getContext("2d");
    const categories = Object.keys(totalSproductCount);
    const counts = Object.values(totalSproductCount);

    const colors = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];

    const newChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Sproduct Count",
            data: counts,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    setChartInstance(newChartInstance);
  };
  

  useEffect(() => {
    renderPieChart();
  }, [totalSproductCount]);

  return (
    <div className="flex max-h-max">
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
            to="/product-admin-dashboard"
          />
          <NavLink
            icon={dashboard}
            text="Create Listing"
            to="/product-listing"
          />
          <NavLink icon={dashboard} text="View Products" to="/product-view" />
          {/* Add more navigation items as needed */}

          <NavLink icon={dashboard} text="View Stocks" to="/view-stocks" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />
        <div className="flex flex-col gap-10 mt-16 ">
          {/* Render cards for each category */}
          <div className="flex flex-wrap justify-center">
            {/* First card for total count of all products */}
            <Link to="/product-view">
              <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-30 shadow-lg h-30 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
                <div className="text-3xl mt-3 font-bold">
                  <p>{itemCount}</p>
                </div>
                <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
                <p className="text-sectiontext">All Products</p>
              </div>
            </Link>
            {/* Render cards for each category */}
            {Object.entries(itemCountByCategory).map(([category, count]) => (
              <Link to={`/products/${category}`} key={category}>
                <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-30 shadow-lg h-30 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
                  <div className="text-3xl mt-3 font-bold">
                    <p>{count}</p>
                  </div>
                  <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
                  <p className="text-sectiontext">{category}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Add canvas for the bar chart */}

          <div className="flex justify-center ml-8 items-center mt-16 w-11/12">
            <div className="w-1/3 h-1/3 mt-15 ml-auto mb-8 justify-center items-center">
              <canvas
                id="categoryPieChart"
                width="100"
                height="100"
                className=""
              ></canvas>
            </div>
            <div className="w-1/2 h-1/2 mb-8 mt-20 ml-auto mr-auto justify-center items-center">
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
      className="flex items-center text-white py-2 px-4 rounded-md bg-sideNavButton hover:bg-sideNavButtonhover"
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
    </Link>
  );
}
