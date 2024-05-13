import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

export default function SupplierAdminDashboard() {
  const [totalSproductCount, setTotalSproductCount] = useState({}); // State variable to store total Sproduct count
  const [totalSuppliers, setTotalSuppliers] = useState(0); // State variable to store total suppliers count
  const [totalProducts, setTotalProducts] = useState(0); // State variable to store total products count
  const [chartInstance, setChartInstance] = useState(null); // State variable to store the chart instance

  useEffect(() => {
    fetchTotalSproductCount();
    fetchTotalSuppliers();
    fetchTotalProducts();
  }, []); // Empty dependency array to run effect only once when component mounts

  const fetchTotalSproductCount = async () => {
    try {
      const response = await axios.get("/api/sproduct/categoryCounts");
      setTotalSproductCount(response.data); // Update total Sproduct count state
    } catch (error) {
      console.error("Error fetching Sproduct count:", error);
    }
  };

  const fetchTotalSuppliers = async () => {
    try {
      const response = await axios.get("/api/supplier/count");
      setTotalSuppliers(response.data.count); // Update total suppliers count state
    } catch (error) {
      console.error("Error fetching suppliers count:", error);
    }
  };

  const fetchTotalProducts = async () => {
    try {
      const response = await axios.get("/api/product/count");
      setTotalProducts(response.data.count); // Update total products count state
    } catch (error) {
      console.error("Error fetching products count:", error);
    }
  };

  useEffect(() => {
    renderPieChart();
  }, [totalSproductCount]);

  const renderPieChart = () => {
    if (!totalSproductCount || Object.keys(totalSproductCount).length === 0) return; // Check if totalSproductCount is available
  
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
            to="/sdashboard"
          />

         <NavLink
            icon={dashboard}
            text="Add Supplier"
            to="/add-supplier"
          />
          <NavLink
            icon={dashboard}
            text="View Suppliers"
            to="/view-suppliers"
          />
          
           <NavLink
            icon={dashboard}
            text="Add Product"
            to="/sproduct"
          />
          <NavLink icon={dashboard} text="View Products" to="/sproduct" />
          
          <NavLink
            icon={dashboard}
            text="Generate Reports"
            to="/sproductreport"
          />
          
          
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />
        <div className="flex flex-col gap-10 mt-36">
          <div className="flex justify-center items-center gap-5">
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
              <h3 className="text-2xl font-semibold">Total Suppliers</h3>
              <p className="text-3xl font-bold">{totalSuppliers}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
              <h3 className="text-2xl font-semibold">Total Products</h3>
              <p className="text-3xl font-bold">{totalProducts}</p>
            </div>
          </div>
          {/* Render cards for each category */}
          <div className="flex flex-wrap justify-center">    
          </div>
        </div>
        <div className="flex justify-center ml-8 items-center mt-16 w-11/12">
          <div className="w-1/3 h-1/3 mt-15 ml-auto mb-8 justify-center items-center">
            <canvas
              id="categoryPieChart"
              width="100"
              height="100"
              className=""
            ></canvas>
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

