import  { useState, useEffect} from "react";
import { useParams ,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OrderDetails() {
    const { currentUser } = useSelector((state) => state.user);
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
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-500';
            case 'cancelled':
                return 'text-red-500';
            default:
                return 'text-orange-500';
        }
    };

    return (
        <div className="max-w-4xl mx-auto shadow-lg border p-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <div className="text-gray-800 font-bold mb-2">Billing Name: {currentUser.username}</div>
        <div className="text-gray-600">Order Status: <span className={getStatusColor(orderDetails.orderStatus)}>{orderDetails.orderStatus}</span></div>
        <div className="text-gray-600">Payment Status: <span className={getStatusColor(orderDetails.paymentStatus)}>{orderDetails.paymentStatus}</span></div>
        <div className="text-gray-600">{orderDetails.date}</div>
                </div>
                <div className="text-right">
                <div className="text-gray-800 font-bold">Order ID: {orderDetails._id}</div>
        <div className="text-gray-600">Tracking ID: {orderDetails.trackingId}</div>
        <div className="text-gray-600">Tracking Status <span className={getStatusColor(orderDetails.trackingStatus)}>{orderDetails.trackingStatus}</span></div>
                </div>
            </div>
            <div className="mt-6">
                    <div className="text-zinc-800 dark:text-zinc-200 font-bold mb-2">Shipping Address:</div>
                    <div className="text-zinc-600 dark:text-zinc-400">
                        {addressDetails.addressLine1}<br />
                        {addressDetails.city}, {addressDetails.state}, {addressDetails.country}
                    </div>
                </div>
            <div className="mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <tr key={item._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.p_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
    {item.p_img ? (
        <img src={item.p_img} alt="product image" onError={(e) => e.target.src = 'https://via.placeholder.com/50x50'} />
    ) : (
        <span>No Image Available</span>
    )}
</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <div className="text-2xl font-bold">Cost: {orderDetails.totalPrice}</div>
                {orderDetails.paymentStatus === 'pending' && (
                   <Link to={`/order-summary/orderId:${orderDetails._id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Pay now</Link>
                )}
                
            </div>
        </div>
    );
}
