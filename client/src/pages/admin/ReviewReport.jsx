import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import logo from '../../images/logo2.png'; // Import your website logo
import 'jspdf-autotable';


import { Link } from "react-router-dom";

import dashboard from "./../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../components/AdminHeader";


const ReviewReport = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/review');
      console.log('Fetched reviews:', response.data);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDownloadReport = () => {
    console.log('Reviews:', reviews);
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Logo
    const imgData = logo;
    const logoWidth = 80;
    const logoHeight = 30;
    doc.addImage(imgData, 'PNG', 10, 10, logoWidth, logoHeight);

    // Title
    doc.setFontSize(25);
    doc.setFont('bold');
    doc.text('Review Report', 165, 25, { align: 'center' });

    // Table
    doc.autoTable({
      startY: 40,
      head: [['Comment', 'Rating']],
      body: reviews.map(review => [review.comment, review.rating]),
    });

    // Download time and date
    const currentDate = new Date();
    const downloadDate = currentDate.toLocaleDateString();
    const downloadTime = currentDate.toLocaleTimeString();
    doc.setFontSize(12); // Decrease font size
    doc.text(`Date and Time :${downloadDate} at ${downloadTime}`, 10, doc.lastAutoTable.finalY + 10, { align: 'left' }); // Align to the left
  
    // Admin signature
    doc.text('Admin Signature:', 165, doc.lastAutoTable.finalY + 20, { align: 'right' }); // Align to the right
    doc.setLineWidth(0.5);
    doc.line(165, doc.lastAutoTable.finalY + 25, 250, doc.lastAutoTable.finalY + 25); // Display line
  

    // Download the PDF
    doc.save('review_report.pdf');
  };

  return (

    <div className="flex h-auto">
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
          to="/reviewadmin"
        />
        <NavLink
          icon={dashboard}
          text="View Reviews"
          to="/reviewlisting"
        />
        <NavLink icon={dashboard} text="Add Respond" to="/admin-responses" />
      </div>
    </div>

    <div className="basis-4/5 ">
      <AdminHeader />




    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Review Report</h1>
      <button onClick={handleDownloadReport} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download Report
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded my-6">
          <thead>
            <tr className="bg-green-500">
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{review.comment}</td>
                <td className="px-4 py-2">{review.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ReviewReport;


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
