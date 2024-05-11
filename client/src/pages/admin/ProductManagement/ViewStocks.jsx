import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

import logoImg from "../../../images/logo2.png";

import jsPDF from "jspdf";
import "jspdf-autotable";

function Sproduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/sproduct/getall");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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


const filteredProducts = products.filter((product) => {
  const nameMatch =
    !searchQuery ||
    product.Product_Name.toLowerCase().includes(searchQuery.toLowerCase());
  const priceMatch =
    !searchQuery || product.Supplier_Price.toString().includes(searchQuery);
  const categoryMatch =
    !selectedCategory || product.Product_Category === selectedCategory;

  return nameMatch && priceMatch && categoryMatch;
});


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log("Selected Category:", e.target.value);
  };

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
      head: [["Product Name", "Product Category", "Supplier_Price", "Quantity"]],
      body: products.map((product) => [
        product.Product_Name,
        product.Product_Category,
        product.Supplier_Price,
        product.Quantity,
      ]),
    });

    doc.save("Stock-list.pdf");
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
            to="/product-admin-dashboard"
          />
          <NavLink
            icon={dashboard}
            text="Create Listing"
            to="/product-listing"
          />
          <NavLink icon={dashboard} text="View Products" to="/product-view" />
          <NavLink icon={dashboard} text="View Stocks" to="/view-stocks" />
        </div>
      </div>

      <div className="basis-4/5">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">
              View Stocks
            </h1>
          </div>

          <div className="flex justify-center mb-10">
            <form className="flex items-center bg-sectionBackground rounded-lg shadow-md border border-green-200 px-4 py-2">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-green-100 w-80 rounded-lg border border-green-300 h-10 px-4 mr-4 focus:outline-none"
              />
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="p-2 rounded-lg border border-green-300 focus:outline-none bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryname}>
                    {category.categoryname}
                  </option>
                ))}
              </select>
            </form>

            <button
              onClick={downloadPdf}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md ml-4"
            >
              Report
            </button>
          </div>

          <div className="flex justify-center items-center">
            <table className="table-auto w-11/12 bg-white shadow-md rounded-lg mb-4">
              <thead>
                <tr className="bg-green-300">
                  <th className="px-4 py-2 text-left rounded-tl-lg">
                    Product Name
                  </th>
                  <th className="px-4 py-2 text-left">Product Category</th>
                  <th className="px-4 py-2 text-left">Supplier Price</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={
                      index % 2 === 0 ? "bg-green-100" : "bg-green-200"
                    }
                  >
                    <td className="border px-4 py-2">{product.Product_Name}</td>
                    <td className="border px-4 py-2">
                      {product.Product_Category}
                    </td>
                    <td className="border px-4 py-2">
                      {product.Supplier_Price}
                    </td>
                    <td className="border px-4 py-2">{product.Quantity}</td>
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
