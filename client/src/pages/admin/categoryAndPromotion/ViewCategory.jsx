import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../../images/logo2.png";
import dashboard from "./../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";
import { useRef, useState, useEffect } from "react";

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
          <NavLink icon={dashboard} text="Add Categories" to="/addCategory" />
          <NavLink
            icon={dashboard}
            text="View Categories"
            to="/viewCategories"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 basis-4/5">
        {/* Header */}
        <AdminHeader />
        <div className="p-3 flex justify-center items-center flex-col mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="overflow-x-auto  bg-sectionBackground rounded-lg">
            <table className="table-auto border-collapse m-8">
              <thead>
                <tr className="">
                  <th className="px-4 py-2">Category Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Avatar</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{category.categoryname}</td>
                    <td className="px-4 py-2">{category.description}</td>
                    <td className="px-4 py-2">
                      <img
                        src={category.avatar}
                        alt="Avatar"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                      <Link to={`/updatecategory/${category._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded ml-2">
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8">{/* Your main content goes here */}</div>
      </div>
    </div>
  );
}

// NavLink Component for sidebar navigation items
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
