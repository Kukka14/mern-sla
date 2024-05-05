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
      {orders.map((order) => (
        <div key={order._id} className="bg-white border border-zinc-300 rounded-lg px-8 py-4 shadow-md max-w-4xl mx-auto my-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col space-y-1">
              <span className="text-zinc-800 font-semibold">Order ID: {order._id}</span>
              <span className="text-green-500">Status: <span className="font-semibold">{order.orderStatus}</span></span>
              <span>Billing name: {order.billingName}</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-600 text-sm">{order.createdAt}</span>
              <div className="text-2xl font-bold my-1">Cost: {order.totalPrice-order.promotionPrice}</div>
              <Link to={`/order_details/orderId:${order._id}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
