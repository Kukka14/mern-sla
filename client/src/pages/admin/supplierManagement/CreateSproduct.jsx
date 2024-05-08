import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

function CreateSproduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Supplier_Name: '',
    Supplier_Email: '',
    Product_Name: '',
    Supplier_Price: '',
    Quantity: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    const isLetter = (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
    const isSpace = charCode === 32;

    if (!isLetter || isSpace) { 
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.post('/api/sproduct/add', formData);
  
      setLoading(false);
      
      navigate('/sproduct');
    } catch (error) {
      setError(error.message || 'An error occurred.');
      setLoading(false);
      console.error('Error:', error);
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
            to="/create-sproduct"
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
  
        <div className="basis-4/5 ">
          <AdminHeader />


    <div className="min-h-screen flex items-center justify-center">
      <div className="w-3/4 bg-white rounded p-3">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-semibold">Add New Supplier Product</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Supplier Name"
              className="border p-3 rounded-lg bg-gray-300"
              id="Supplier_Name"
              maxLength="62"
              minLength="2"
              title="Please enter only letters"
              required
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={formData.Supplier_Name}
            />

            <input
              type="email"
              placeholder="Supplier E-mail (eg: example@example.com)"
              className="border p-3 rounded-lg bg-gray-300"
              id="Supplier_Email"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.Supplier_Email}
            />

            <input
              type="text"
              placeholder="Product Name"
              className="border p-3 rounded-lg bg-gray-300"
              id="Product_Name"
              maxLength="62"
              minLength="2"
              required
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={formData.Product_Name}
            />

            <input
              type="text"
              placeholder="Supplier Price"
              className="border p-3 rounded-lg bg-gray-300"
              id="Supplier_Price"
              maxLength="8"
              minLength="4"
              required
              inputMode="numeric"
              pattern="[0-9]*"
              title="Please enter only numbers"
              onChange={handleChange}
              value={formData.Supplier_Price}
            />

            <input
              type="number"
              placeholder="Quantity"
              className="border p-3 rounded-lg bg-gray-300"
              id="Quantity"
              maxLength="2"
              minLength="1"
              max="50"
              min="1"
              required
              inputMode="numeric"
              pattern="[0-9]*"
              title="Please enter only numbers"
              onChange={handleChange}
              value={formData.Quantity}
            />

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p> }
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default CreateSproduct;


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