import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaMoneyBill } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  
import 'react-toastify/dist/ReactToastify.css';

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState(""); // State to store the selected sorting option
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser) || null;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/listing/get/:id");
      const allProducts = response.data;
      setProducts(allProducts);
      setLoading(false);
      const uniqueCategories = Array.from(new Set(allProducts.map(product => product.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = () => {
    let sorted = [...filteredProducts];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => {
        const priceA = a.discountedPrice || a.regularPrice;
        const priceB = b.discountedPrice || b.regularPrice;
        return priceA - priceB;
      });
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => {
        const priceA = a.discountedPrice || a.regularPrice;
        const priceB = b.discountedPrice || b.regularPrice;
        return priceB - priceA;
      });
    }
    return sorted;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true;
    return matchesSearch && matchesCategory;
  });

  const handleBuy = (product) => {
    // Handle buy logic
  };

  const handleAddToCart = async (product) => {
    // Handle add to cart logic
  };

  return (
    <div className="container mx-auto px-10">
      <h1 className="text-2xl mt-5 text-center font-semibold mb-8">Products</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-gray-100 border border-gray-300 p-2 mr-4 rounded"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-gray-100 border border-gray-300 p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="bg-gray-100 border border-gray-300 p-2 rounded ml-4"
        >
          <option value="">Sort by Price</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p> 
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-20">
          {sortedProducts().map((product) => (
            <div key={product._id} className="bg-green-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
              <Link to={`/product-detail/${product._id}`}>
                <img
                  src={product.imageUrls[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 line-clamp-1 mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-blue-600 ">
                    {product.discountedPrice ? (
                      <div>
                        <p className="text-red-500 line-through text-xs"> Rs.{product.regularPrice.toFixed(2)}</p>
                        <p className="font-bold">Rs.{product.discountedPrice.toFixed(2)}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-bold" style={{ marginBottom: "1rem" }}> Rs.{product.regularPrice.toFixed(2)}</p>
                      </div>
                    )}
                  </p>
                  <p className="text-gray-500">{product.quantity} in stock</p>
                </div>
                <p className="text-gray-500 mb-4">{product.category}</p>
                <div className="flex justify-between ">
                  <button
                    onClick={() => handleBuy(product)}
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FaMoneyBill className="mr-2" /> Buy
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default ProductView;
