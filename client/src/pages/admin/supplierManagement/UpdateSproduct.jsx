import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

function UpdateSproduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Supplier_Name: "",
    Product_Name: "",
    Supplier_Price: "",
    Quantity: "",
    Product_Category: "", // Add Product_Category to formData
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/sproduct/getdetails/${id}`);
        const {
          Supplier_Name,
          Product_Name,
          Supplier_Price,
          Quantity,
          Product_Category,
        } = response.data;
        setFormData({
          Supplier_Name,
          Product_Name,
          Supplier_Price,
          Quantity,
          Product_Category,
        });
        console.log("Product_Category:", Product_Category); // Log the value
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/getAllCategories");
        setCategories(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "Product_Category") {
      const categoryId = value; // Value is the category ID
      const categoryName =
        categories.find((cat) => cat._id === categoryId)?.categoryname || ""; // Find category name based on ID
      setFormData({
        ...formData,
        Product_Category: categoryId, // Set category ID
        Product_Category_Name: categoryName, // Set category name
      });
    } else {
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
      // Fetch the selected category object
      const selectedCategory = categories.find(
        (Product_Category) => Product_Category._id === formData.Product_Category
      );
      if (!selectedCategory) {
        throw new Error("Selected category not found.");
      }

      // Include the category name in the form data
      const updatedFormData = {
        ...formData,
        Product_Category_Name: selectedCategory.categoryname,
      };

      // Send the request with updated form data
      const response = await axios.put(
        `/api/sproduct/update/${id}`,
        updatedFormData
      );
      if (response.status === 200) {
        // Product updated successfully
        navigate("/sproduct");
      } else {
        setError("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("An error occurred while updating the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-sideNavBackground w-1/5 p-4">
        <div className="flex justify-center items-center mb-8">
          <img src={logo} alt="Company Logo" className="w-48 h-auto" />
        </div>
        <hr className="border-gray-700 my-4" />
        <div className="space-y-1">
          <NavLink icon={dashboard} text="Main Dashboard" to="/sdashboard" />
          <NavLink icon={dashboard} text="Add Supplier" to="/add-supplier" />
          <NavLink
            icon={dashboard}
            text="View Suppliers"
            to="/view-suppliers"
          />
          <NavLink icon={dashboard} text="Add Product" to="/create-sproduct" />
          <NavLink icon={dashboard} text="View Products" to="/sproduct" />
          <NavLink
            icon={dashboard}
            text="Generate Reports"
            to="/sproductreport"
          />
        </div>
      </div>
      <div className="basis-4/5">
        <AdminHeader />
        <div className="min-h-screen  flex items-center justify-center">
          <div className="w-3/4 bg-white rounded p-3">
            <div className="flex justify-between mb-4">
              <h1 className="text-3xl font-semibold">
                Update Supplier Product
              </h1>
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

                <select
                  id="Product_Category"
                  className="border p-3 rounded-lg bg-gray-200"
                  required
                  onChange={handleChange}
                  value={formData.Product_Category} // Ensure this matches the ID of the selected category
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryname}
                    </option>
                  ))}
                </select>

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

                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                >
                  {loading ? "Updating Product..." : "Update Product"}
                </button>
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

export default UpdateSproduct;
