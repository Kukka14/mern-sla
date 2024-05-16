import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./../../../images/logo2.png";
import dashboard from "./../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

export default function PaymentDashboard() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await fetch("/api/payment/data");
      const data = await response.json();

      // Calculate total income
      const totalIncome = data.payments.reduce(
        (total, payment) => total + payment.paymentAmount,
        0
      );

      // Calculate income in the month
      const currentMonth = new Date().getMonth() + 1;
      const monthlyIncome = data.payments.reduce((total, payment) => {
        const paymentMonth = new Date(payment.paymentDate).getMonth() + 1;
        return paymentMonth === currentMonth ? total + payment.paymentAmount : total;
      }, 0);

      // Set state with fetched data
      setTotalIncome(totalIncome);
      setMonthlyIncome(monthlyIncome);
      setPaymentCount(data.payments.length);
      console.log(data.payments,length);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
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
        <NavLink icon={dashboard} text="Payment Dashboard" to="/payment-dashboard" />
          <NavLink icon={dashboard} text="Manage Payment" to="/paymentdetails" />
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
                <p>{totalIncome}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">Total Income</p>
            </div>
            {/* Pending Orders */}
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-30 shadow-lg h-30 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{monthlyIncome}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">Monthly Income</p>
            </div>
            {/* Completed Orders */}
            <div className="flex flex-col justify-center items-center hover:bg-sectionBackgroundHover bg-sectionBackground w-30 shadow-lg h-30 rounded-2xl border-green-900 hover:shadow-lg transform transition-all duration-300 ease-in-out m-2">
              <div className="text-3xl mt-3 font-bold">
                <p>{paymentCount}</p>
              </div>
              <hr className="mt-3 mb-2 w-40 h-px bg-sectionhr border-0" />
              <p className="text-sectiontext">Num of Total Payment</p>
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