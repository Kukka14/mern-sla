import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

export default function MainDashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    fetchOrderCounts();
  }, [ ]);

  useEffect(() => {
    if (chartInstance) {
      renderPieChart();
    }
  }, [totalOrders, pendingOrders, completedOrders]);

  const fetchOrderCounts = async () => {
    try {
      const response = await fetch("/api/order/count");
      const data = await response.json();
      const { total, pending, completed } = data;
      setTotalOrders(total);
      setPendingOrders(pending);
      setCompletedOrders(completed);
      // Chart rendering only after fetching data
      renderPieChart();
    } catch (error) {
      console.error("Error fetching order counts:", error);
    }
  };

  const renderPieChart = () => {
    const ctx = document.getElementById("orderPieChart");
    if (!ctx) return;

    if (chartInstance) {
      chartInstance.destroy(); // Destroy previous instance to avoid memory leaks
    }

    const newChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Pending Orders", "Completed Orders"],
        datasets: [
          {
            label: "Order Count",
            data: [pendingOrders, completedOrders],
            backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
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
          <NavLink icon={dashboard} text="Order Dashboard" to="/order-dashboard" />
          <NavLink icon={dashboard} text="New Order Dashboard" to="/new-orders-dashboard" />
          <NavLink icon={dashboard} text="Manage Orders" to="/manage-orders-dashboard" />
          <NavLink icon={dashboard} text="Complete Orders" to="/complete-orders-dashboard" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />
        <div className="flex flex-col gap-10 mt-16 ">
          {/* Render cards for order counts */}
          <div className="flex flex-wrap justify-center">
            {/* Total Orders */}
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-30 shadow-lg h-30 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{totalOrders}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">Total Orders</p>
            </div>
            {/* Pending Orders */}
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-30 shadow-lg h-30 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{pendingOrders}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">Pending Orders</p>
            </div>
            {/* Completed Orders */}
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-30 shadow-lg h-30 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{completedOrders}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">Completed Orders</p>
            </div>
          </div>
          {/* Add canvas for the pie chart */}
          <div className="flex justify-center items-center mt-16 w-11/12">
  <div className="w-1/3 h-1/3 mt-15 ml-auto mb-8 justify-center items-center text-center">
    <canvas id="orderPieChart" className="" />
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
