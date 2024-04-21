import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import logo from "./../../images/logo2.png";
import dashboard from "./../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../components/AdminHeader";

const ReviewProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/listing/get/:id");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/getAllCategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/listing/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Edit review with ID: ${id}`);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/listing?search=${searchQuery}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching Products:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-sideNavBackground basis-1/5 p-4">
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
            to="/product-admin-dashboard"
          />
          <NavLink
            icon={dashboard}
            text="Create Listing"
            to="/product-listing"
          />
          <NavLink icon={dashboard} text="View Products" to="/product-view" />
        </div>
      </div>

      <div className="basis-4/5 ">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Review Listing</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Search
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Images</th>
                  <th className="px-4 py-2 text-left">Delete/Update</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                  >
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                    <td className="border px-4 py-2">{product.type}</td>
                    <td className="border px-4 py-2">{product.regularPrice}</td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">
                      {
                        categories.find(
                          (category) => category._id === product.category
                        )?.categoryname
                      }
                    </td>
                    <td className="border px-4 py-2">
                      {product.imageUrls &&
                        Array.isArray(product.imageUrls) &&
                        product.imageUrls.map((url) => (
                          <img
                            key={url}
                            src={url}
                            alt="Product"
                            className="w-24 h-24 object-cover rounded-md mr-2 mb-2 shadow-sm"
                          />
                        ))}
                    </td>

                    <td className="border px-4 py-2">
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded mb-1 hover:bg-red-600 "
                        >
                          Delete
                        </button>
                        <Link
                          to={`/update-product/${product._id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-600 text-center"
                        >
                          Update
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
};

export default ReviewProductList;

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