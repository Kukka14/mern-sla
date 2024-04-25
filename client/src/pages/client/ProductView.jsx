import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaMoneyBill } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  
import 'react-toastify/dist/ReactToastify.css';

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser) || null;

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

  const handleBuy = (product) => {
    if(currentUser) {
      handleAddToCart(product);
      setTimeout(() => {
        navigate("/cart");
      }, 4500);
    } else {
      toast.error("Please login to buy items to the cart", {
        onClose: () => {
          navigate("/sign-in");
        }
      });
    }
  };
  

  const handleAddToCart = async(product) => {
    if (!currentUser) {
      toast.error("Please login to add items to the cart");
      navigate("/sign-in");
      return;
    }
    try {
      const response = await fetch("/api/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id, // Use currentUser from Redux store
          productId: product._id,
          productName: product.name,
          productImages: product.imageUrls,
          price: product.regularPrice,
          quantity: 1, // Adjust quantity as needed
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();

      if (data.success && data.updated) {
        toast.success("Item added to cart successfully");
      } else if (data.success && !data.updated) {
        toast.success("Item quantity updated successfully");
      } else {
        console.error("Failed to add item to cart:", data.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };


  return (
    <div className="container mx-auto px-10">
      <h1 className="text-3xl font-semibold mb-8">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
      <ToastContainer />
    </div>
  );
}


export default ProductView;
