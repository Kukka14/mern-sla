import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Ordersummary() {
  const [orderDetails, setOrderDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [addressDetails, setAddressDetails] = useState({});
  const [promoCode, setPromoCode] = useState("");

  const { orderId } = useParams();

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  const paymenthdl = async () => {
    try {
      const cleanOrderId = orderId.split(":")[1];
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: cleanOrderId }) // Wrap orderId in an object
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message + " Please try again later.");
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        toast.success("Payment Successful");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error processing payment. Please try again later.");
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const cleanOrderId = orderId.split(":")[1];
      const response = await fetch(`/api/order/get/${cleanOrderId}`);
      const data = await response.json();

      setOrderDetails(data.order);
      console.log('Order details received:', data);
      const cartId = data.order.cartId;
      fetchCartItems(cartId);
      fetchAddressDetails(data.order.addressId);
      console.log('cartId:', cartId);
      console.log('addressId:', data.order.addressId);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const fetchCartItems = async (cartId) => {
    try {
      const response = await fetch(`/api/cart/getcart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId }),
      });
      const data = await response.json();

      setCartItems(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchAddressDetails = async (addressId) => {
    try {
      const response = await fetch(`/api/address/getdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addressId }),
      });
      const data = await response.json();

      setAddressDetails(data.address);
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };


  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Order Summary</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className=" items-start shadow-md mb-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
          <div className="items-start bg-slate-200 rounded-md mx-4 px-3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center shadow-sm mb-4">
                <img
                  src={item.p_img[0]}
                  alt={item.p_name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{item.p_name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total Price: ${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <div>
            <p>Total Price: ${orderDetails.totalPrice}</p>
            <p>Promotion Price: ${orderDetails.promotionPrice}</p>
            <p>Total Price to Pay: ${orderDetails.totalPriceToPay}</p>
          </div>
          <h3 className="text-xl font-semibold mt-8 mb-4">Shipping Address</h3>
          <div>
            <p>Address: {addressDetails.addressLine1}</p>
            <p>City: {addressDetails.city}</p>
            <p>State: {addressDetails.state}</p>
            <p>Zip: {addressDetails.postalCode}</p>
            <p>Country: {addressDetails.country}</p>
          </div>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleApplyPromoCode}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
            >
              Apply
            </button>
          </div>
          <div className="mt-8">
            <button
              onClick={paymenthdl}
              className="px-8 py-3 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
