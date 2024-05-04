import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";

function ProductByCategory() {
  const { categoryName } = useParams(); // Retrieve the category name from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`/api/listing/category/${categoryName}`);
        setProducts(response.data); // Update the products state with fetched data
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory(); // Call the function to fetch products when the component mounts
  }, [categoryName]); // Dependency array to ensure useEffect runs when categoryName changes

  return (
    <div className="flex h-s">
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
        </div>
      </div>

      <div className="basis-4/5">
        <AdminHeader /> 
        <div className="overflow-x-auto">
        <div className="flex justify-center mt-5">
            <h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">
              {categoryName}s
            </h1>
          </div>
          


          <div className="flex justify-center items-center">
            <table className="table-auto w-11/12 bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-300">
                  <th className="px-4 py-2 text-left rounded-tl-lg">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">Images</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className={index % 2 === 0 ? "bg-green-100" : "bg-green-200"}>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.description}</td>
                    <td className="border px-4 py-2">{product.type}</td>
                    <td className="border px-4 py-2">{product.regularPrice}</td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">{product.category}</td>
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
      className="flex items-center text-white py-2 px-4 rounded-md bg-sideNavButton hover:bg-sideNavButtonhover"
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
    </Link>
  );
}

export default ProductByCategory;
