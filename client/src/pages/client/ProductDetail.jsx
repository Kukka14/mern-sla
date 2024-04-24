import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaMoneyBill } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cardHeight, setCardHeight] = useState("auto");
  const currentUser = useSelector((state) => state.user.currentUser) || null;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/api/listing/${id}`);
        setProduct(response.data);
        setLoading(false);

        const categoryResponse = await axios.get(
          `/api/category/${response.data.category}`
        );
        setCategory(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  useEffect(() => {
    if (product) {
      const descriptionWords = product.description.split(" ");
      if (descriptionWords.length > 80) {
        const truncatedDescription = descriptionWords.slice(0, 80).join(" ");
        setProduct({ ...product, description: truncatedDescription });
      }
    }
  }, [product]);

  useEffect(() => {
    const cardContent = document.getElementById("card-content");
    if (cardContent) {
      setCardHeight(`${cardContent.offsetHeight}px`);
    }
  }, [product]);

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.imageUrls.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length
    );
  };

  const handleBuy = () => {
    if(currentUser) {
      handleAddToCart();
      setTimeout(() => {
        navigate("/cart");
      }, 4000);
    } else {
      toast.error("Please login to buy items to the cart", {
        onClose: () => {
          navigate("/sign-in");
        }
      });
    }
  };
  


  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error("Please login to add items to the cart");
      history.push("/signin");
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
        console.log(data.success, data.updated);
        toast.success("Item quantity updated successfully");
      } else if (data.success && !data.updated) {
        toast.success("Item added to cart successfully");
      } else {
        console.error("Failed to add item to cart:", data.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : product ? (
        <div
          className="flex bg-green-200 rounded-lg shadow-md max-w-4xl"
          style={{ minHeight: cardHeight }}
        >
          <div className="relative flex-1 p-8">
            <div className="relative h-80 w-80">
              <img
                src={product.imageUrls[currentImageIndex]}
                alt={`Product Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded-lg transition-transform duration-300 transform hover:scale-105"
              />
              <button
                className="absolute top-1/2 left-0 bg-black text-white font-bold py-2 px-3 rounded-full m-2 transform -translate-y-1/2"
                onClick={handlePrevImage}
              >
                &lt;
              </button>
              <button
                className="absolute top-1/2 right-0 bg-black text-white font-bold py-2 px-3 rounded-full m-2 transform -translate-y-1/2"
                onClick={handleNextImage}
              >
                &gt;
              </button>
            </div>
          </div>
          <div id="card-content" className="flex-1 p-8 overflow-hidden">
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <p className="text-lg font-semibold mb-2">Description:</p>
            <p className="text-base mb-4 overflow-y-auto">{product.description}</p>
            <p className="text-lg font-semibold text-blue-600 mb-2">
              Price: Rs. {product.regularPrice}
            </p>
            <p className="text-lg  text-gray-500 mb-2">
              Stock: {product.quantity}
            </p>
            {category && (
              <p className="text-lg text-slate-600 font-semibold mb-2">
                Category: {category.categoryname}
              </p>
            )}
            <div className="flex ">
              <button
                onClick={() => handleBuy(product.id)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded mr-3"
              >
                <FaMoneyBill className="mr-2" /> Buy
              </button>
              <button
                onClick={() => handleAddToCart()}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
              >
                <FaShoppingCart className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Product not found.</p>
      )}
       <ToastContainer />
    </div>
  );
};

export default ProductDetail;
