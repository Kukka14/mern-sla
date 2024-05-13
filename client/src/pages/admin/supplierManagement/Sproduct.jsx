import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Importing search icon from react-icons/fa


import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

function Sproduct() {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/sproduct/getall');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error); // Set error state if there's an error fetching products
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/getAllCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sproduct/delete/${id}`);
      // Refresh the product list after deletion
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredProducts = products.filter(product =>
    product.Supplier_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.Supplier_Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.Product_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.Supplier_Price.toString().includes(searchQuery)
  );

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
              <Link to="/create-sproduct" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">Add Products+</Link>
              <div className="flex items-center"> {/* Wrapping the search icon and input in a div */}
                <FaSearch className="mr-2" /> {/* Search icon */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search supplier..."
                  className="border px-4 py-2"
                />
              </div>
            </div>
            <table  className="table-auto w-11/12 bg-white shadow-md rounded-lg mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Supplier Name</th>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Product Category</th>
                  <th className="px-4 py-2">Supplier Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="border px-4 py-2">{product.Supplier_Name}</td>
                    <td className="border px-4 py-2">{product.Product_Name}</td>
                    <td className="border px-4 py-2">{product.Product_Category}</td>
                    <td className="border px-4 py-2">{product.Supplier_Price}</td>
                    <td className="border px-4 py-2">{product.Quantity}</td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col">
                        <Link to={`/update-sproduct/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-600 text-center">Edit</Link>
                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded mt-1 hover:bg-red-600">Delete</button>
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

export default Sproduct;


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