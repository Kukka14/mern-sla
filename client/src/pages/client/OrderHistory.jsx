import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function OrderHistory() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/order/user_orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUser._id })
      });
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Order History</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="bg-white shadow-md rounded-lg p-6">
            <p className="text-lg font-semibold">Order ID: {order._id}</p>
            <p className="text-gray-600">Date: {order.createdAt}</p>
            <Link to={`/order_details/orderId:${order._id}`} className="text-blue-600 hover:underline">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
