import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";
import { useNavigate } from 'react-router-dom';

function CreateSproduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Supplier_Name: '',
    Product_Name: '',
    Product_Category: '',
    Supplier_Price: '',
    Quantity: '',
  });
  const [categories, setCategories] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category/getAllCategories');
        setCategories(response.data);
      } catch (error) {
        setError(error.message || 'Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSupplierNames = async () => {
      try {
        const response = await axios.get('/api/supplier/names');
        setSupplierNames(response.data);
      } catch (error) {
        setError(error.message || 'Failed to fetch supplier names');
      }
    };

    fetchSupplierNames();
  }, []);
  const handleChange = (e) => {
    // Prevent typing special characters and spaces in the 'Product_Name' field
    if (e.target.id === 'Product_Name') {
        const value = e.target.value.replace(/[!@#\$%\^&\*\(\)\<\>\[\]\{\};:'"|,\.\? ]/gi, '');
        setFormData({
            ...formData,
            [e.target.id]: value,
        });
    } else {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setError(null);

        // Fetch the selected category object
        const selectedCategory = categories.find(cat => cat._id === formData.Product_Category);
        if (!selectedCategory) {
            throw new Error("Selected category not found.");
        }

        // Include the category name in the form data
        const updatedFormData = {
            ...formData,
            Product_Category: selectedCategory.categoryname,
        };

        // Send the request with updated form data
        const response = await axios.post('/api/sproduct/add', updatedFormData);

        setLoading(false);

        navigate('/sproduct')
        
        // Redirect to the product listing page
        // You might need to adjust the route depending on your setup
        // navigate('/sproduct');
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
          <NavLink icon={dashboard} text="Main Dashboard" to="/sdashboard" />
          <NavLink icon={dashboard} text="Add Supplier" to="/add-supplier" />
          <NavLink icon={dashboard} text="View Suppliers" to="/view-suppliers" />
          <NavLink icon={dashboard} text="Add Product" to="/create-sproduct" />
          <NavLink icon={dashboard} text="View Products" to="/sproduct" />
          <NavLink icon={dashboard} text="Generate Reports" to="/sproductreport" />
        </div>
      </div>
  
      <div className="basis-4/5">
        <AdminHeader />
  
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-3/4 bg-white rounded p-3">
            <div className="flex justify-center mt-4">
              <h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">Add New Supplier Product</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col gap-4 flex-1">
                <select
                  id="Supplier_Name"
                  className="border p-3 rounded-lg bg-gray-300"
                  required
                  onChange={handleChange}
                  value={formData.Supplier_Name}
                >
                  <option value="">Select Supplier</option>
                  {supplierNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
  
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border p-3 rounded-lg bg-gray-300"
                  id="Product_Name"
                  maxLength="62"
                  minLength="2"
                  required
                  onChange={handleChange}
                  value={formData.Product_Name}
                />
  
                <select
                  id="Product_Category"
                  className="border p-3 rounded-lg bg-gray-300"
                  required
                  onChange={handleChange}
                  value={formData.Product_Category}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryname}
                    </option>
                  ))}
                </select>
  
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
                  className="bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-blue-600 w-full"
                >
                  {loading ? 'Adding Product...' : 'Add Product'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
              </div>
            </form>
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

export default CreateSproduct;
