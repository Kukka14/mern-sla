import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [addressDetails, setAddressDetails] = useState({});

    useEffect(() => {
        fetchOrderDetails(orderId);
    }, [orderId]);

    const fetchOrderDetails = async (orderId) => {
        try {
            const cleanOrderId = orderId.split(':')[1];
            const response = await fetch(`/api/order/get/${cleanOrderId}`);
            const data = await response.json();

            setOrderDetails(data.order);
            const cartId = data.order.cartId;
            fetchCartItems(cartId);
            fetchAddressDetails(data.order.addressId);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const fetchCartItems = async (cartId) => {
        try {
            const response = await fetch(`/api/cart/getcart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartId })
            });
            const data = await response.json();

            setCartItems(data.items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const fetchAddressDetails = async (addressId) => {
        try {
            const response = await fetch(`/api/address/getdetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ addressId })
            });
            const data = await response.json();

            setAddressDetails(data.address);
        } catch (error) {
            console.error('Error fetching address details:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order ID: {orderDetails._id}</h2>
                    <h2 className="text-lg font-semibold mb-2">Cart Items:</h2>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li key={item._id} className="flex flex-col border-b pb-4">
                                <p className="text-gray-700"><span className="font-semibold">Product Name:</span> {item.productName}</p>
                                <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                                <p className="text-gray-700"><span className="font-semibold">Price:</span> {item.price}</p>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-lg font-semibold mt-6 mb-2">Address Details:</h2>
                    <p className="text-gray-700"><span className="font-semibold">Address Line 1:</span> {addressDetails.addressLine1}</p>
                    <p className="text-gray-700"><span className="font-semibold">City:</span> {addressDetails.city}</p>
                    <p className="text-gray-700"><span className="font-semibold">State:</span> {addressDetails.state}</p>
                    <p className="text-gray-700"><span className="font-semibold">Country:</span> {addressDetails.country}</p>
                </div>
            </div>
        </div>
    );
}
