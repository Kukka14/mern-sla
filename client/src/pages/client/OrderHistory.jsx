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
  
  const handleCancel = async (orderId) => {
    console.log(orderId);
    try {
      await fetch(`/api/order/cancel/${orderId}`, { method: 'PUT' });
      fetchOrders(); 
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <div className="container mx-16 px-28 py-8 bg-green-100"> 
    <div className="flex justify-center">
    <h1 className="text-3xl font-semibold text-green-900 mb-8">Order History</h1>
    </div>
    <div className="grid grid-cols-1 gap-6 px-72">
      {orders.map((order) => (
        <div key={order._id} className="bg-white border border-zinc-300 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-start">
            <div className="flex flex-col space-y-4">
              <span className="text-zinc-800 font-semibold">Order ID: {order._id}</span>
              <span className={
  order.orderStatus === 'completed' ? 'text-green-500' : 
  order.orderStatus === 'cancelled' ? 'text-red-500' :
  'text-yellow-600'
}>
                  Status: <span className="font-semibold">{order.orderStatus}</span>
                </span>
              <span>Billing name: {currentUser.username}</span>
            </div>
            <div className="flex flex-col items-end items">
              <span className="text-zinc-600 text-sm">{order.createdAt.split('T')[0]}</span>
              <div className="text-lg font-bold my-1">Total: {order.totalPrice-order.promotionPrice}</div>
              <div className=' my-1 py-2'>
              <Link to={`/order_details/orderId:${order._id}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
                View
              </Link>
              {order.orderStatus === 'pending' && (
                    <button onClick={() => handleCancel(order._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded ml-2">
                      Cancel
                    </button>
                  )}
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}