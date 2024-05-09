import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import logoImg from "../../../images/logo2.png"; 
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/category`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        setCategories(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const downloadPdf = () => {
    const doc = new jsPDF();
    
    // Add company logo at the top-left corner
    doc.addImage(logoImg, "PNG", 12.5, 10, 70, 30); // Adjust the width and height as needed
  
    // Add title
    doc.text("Product List", 14, 60);
  
    // Add table
    doc.autoTable({
      theme: "striped",
      startY: 70, // Adjust based on logo size and title height
      head: [["Name", "Description"]],
      body: categories.map((category) => [
        category.categoryname,
        category.description
      ]),
    });
  
    doc.save("product-list.pdf");
};

  const handleDelete = async (categoryId) => {
    try {
      const res = await fetch(`/api/category/${categoryId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete category");
      }
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}
           
      <Link  to="/mainDashboard">
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

      <div className="basis-4/5 ">
        <AdminHeader />

        <div>
        <div className="flex justify-center">
            <h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">
              Categories
            </h1>
          </div>
          {/* Search and Filter */}
          <div className="flex justify-end mb-10 mr-12">
            

            <button
              onClick={downloadPdf}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md ml-4"
            >
              Report
            </button>
          </div>
          <div className="flex justify-center items-center">
          <table className="table-auto w-11/12 bg-white shadow-md rounded-lg">
            <thead >
              <tr className="bg-green-300">
                <th className="px-4 py-2 text-left rounded-tl-lg">Category Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Avatar</th>
                <th className="px-4 py-2 text-left rounded-tr-lg">Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}className={
                  index % 2 === 0 ? "bg-green-100" : "bg-green-200"
                }>
                  <td className="border px-4 py-2">{category.categoryname}</td>
                  <td className="border px-4 py-2">{category.description}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={category.avatar}
                      alt="Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td className="border px-4 py-2">
                  <div className="flex flex-col">
                    <button onClick={() => handleDelete(category._id)} className="bg-red-500 text-white px-4 py-2 rounded mb-1 hover:bg-red-600">
                      Delete
                    </button>
                    <Link to={`/updatecategory/${category._id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-600 text-center">Update</button>
                    </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

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
