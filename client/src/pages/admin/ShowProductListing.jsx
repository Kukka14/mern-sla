import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

import logo from "./../../images/logo2.png";
import dashboard from "./../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../components/AdminHeader";

const ReviewProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCatergories, setSelectedCatergories] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategorie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/category/`);
        const data = await res.json();
        console.log(data);
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchCategorie();
  }, []);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let url = "/api/listing?";
        if (searchQuery) {
          url += `productName=${searchQuery}`;
          if (selectedCategory) {
            url += `&category=${selectedCategory}`;
          }
        } else if (selectedCategory) {
          url += `category=${selectedCategory}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [searchQuery, selectedCategory]);

  //   console.log(product);

  const downloadPdf = () => {
    console.log(categories); // Check if categories state is populated
    const doc = new jsPDF();
    doc.text("Product List", 14, 16);
    doc.autoTable({
      theme: "striped",
      startY: 22,
      head: [["Name", "Description", "Price", "Type", "Stock", "Category"]],
      body: products.map((product) => {
        const category = categories.find(
          (category) => category._id === product.category
        );
        console.log(category); // Check if category object is retrieved correctly
        const categoryname = category ? category.categoryname : ""; // Assuming categoryName is a property of your category object
        console.log(categoryname); // Check if categoryName is correctly assigned
        return [
          product.name,
          product.description,
          product.regularPrice,
          product.type,
          product.quantity,
          categoryname,
        ];
      }),
    });
    doc.save("product-list.pdf");
  };

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
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex h-auto">
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
          <div className="flex justify-center">
            <h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">
              Listed Products
            </h1>
          </div>

          <div className="flex justify-center mb-10  ">
            <form className="flex items-center bg-sectionBackground rounded-lg shadow-md border border-green-200 px-4 py-2">
              <input
                type="text"
                placeholder="Search by name..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-green-100 w-80 rounded-lg border border-green-300 h-10 px-4 mr-4 focus:outline-none"
              />
              <select
                onChange={handleChange}
                value={selectedCategory}
                className="p-2 rounded-lg border border-green-300 focus:outline-none bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
            </form>

            <button
              onClick={downloadPdf}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md ml-4 "
            >
              Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-300">
                  <th className="px-4 py-2 text-left rounded-tl-lg">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Images</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">
                    Delete/Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className={
                      index % 2 === 0 ? "bg-green-100" : "bg-green-200"
                    }
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
