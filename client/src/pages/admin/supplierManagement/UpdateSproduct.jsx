import React, { useState,useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';

import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

function UpdateSproduct() {
  const { id } = useParams();
  const navigate= useNavigate();

  const [formData, setFormData] = useState({
    Supplier_Name: '',
    Supplier_Email: '',
    Product_Name: '',
    Supplier_Price: '',
    Quantity: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/sproduct/getdetails/${id}`);
        const { Supplier_Name, Supplier_Email, Product_Name, Supplier_Price, Quantity } = response.data;
        setFormData({ Supplier_Name, Supplier_Email, Product_Name, Supplier_Price, Quantity });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/sproduct/update/${id}`, formData);
      // Redirect to the product list after successful update
      navigate('/sproduct');
    } catch (error) {
      console.error('Error updating product:', error);
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
   

    <div className="min-h-screen  flex items-center justify-center">
    <div className="w-3/4 bg-white rounded p-3">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-semibold">Update Supplier Product</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-4 flex-1">
        <input
              type="text"
              placeholder="Supplier Name"
              className="border p-3 rounded-lg bg-gray-200"
              id="Supplier_Name"
              maxLength="62"
              minLength="2"
              required
              onChange={handleChange}
              value={formData.Supplier_Name}
            />

            <input
              type="email"
              placeholder="Supplier E-mail"
              className="border p-3 rounded-lg bg-gray-200"
              id="Supplier_Email"
              maxLength="62"
              minLength="2"
              required
              onChange={handleChange}
              value={formData.Supplier_Email}
            />

            <input
              type="text"
              placeholder="Product Name"
              className="border p-3 rounded-lg bg-gray-200"
              id="Product_Name"
              maxLength="62"
              minLength="2"
              required
              onChange={handleChange}
              value={formData.Product_Name}
            />

            <input
              type="number"
              placeholder="Supplier Price"
              className="border p-3 rounded-lg bg-gray-200"
              id="Supplier_Price"
              min="0"
              required
              onChange={handleChange}
              value={formData.Supplier_Price}
            />

            <input
              type="number"
              placeholder="Quantity"
              className="border p-3 rounded-lg bg-gray-200"
              id="Quantity"
              min="0"
              required
              onChange={handleChange}
              value={formData.Quantity}
            />

            

          {/* Add input fields for other form fields similarly */}

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  </div>
);
}
export default UpdateSproduct;


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
