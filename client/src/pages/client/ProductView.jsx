import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaMoneyBill } from "react-icons/fa";

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/listing/get/:id");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
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

  const handleBuy = (productId) => {
    // Logic for handling the buy action
    console.log(`Buying product ${productId}`);
  };

  const handleAddToCart = (productId) => {
    // Logic for handling the add to cart action
    console.log(`Adding product ${productId} to cart`);
  };

  return (
    <div className="container mx-auto px-10">
      <h1 className="text-3xl font-semibold mb-8">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product._id} to={`/product-detail/${product._id}`}>
              <div className="bg-green-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <img
                  src={product.imageUrls[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-700 line-clamp-1 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg text-blue-600 font-semibold">
                      Rs. {product.regularPrice}
                    </p>
                    <p className="text-gray-500">{product.quantity} in stock</p>
                  </div>
                  <p className="text-gray-500 mb-4">
                    {
                      categories.find(
                        (category) => category._id === product.category
                      )?.categoryname
                    }
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleBuy(product.id)}
                      className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <FaMoneyBill className="mr-2" /> Buy
                    </button>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductView;
