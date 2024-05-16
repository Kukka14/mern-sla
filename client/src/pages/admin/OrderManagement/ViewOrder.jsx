import  { useState, useEffect} from "react";
import { useParams,Link } from 'react-router-dom';
import logo from './../../../images/logo2.png';
import jsPDF from 'jspdf';
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from '../../../components/AdminHeader';


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
            console.log(cleanOrderId);
            const response = await fetch(`/api/order/get/${cleanOrderId}`);
            const data = await response.json();
        

            setOrderDetails(data.order);
            console.log(data.order);
            const cartId = data.order.cartId;
            console.log(cartId);
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
    const generatePDF = () => {
        if (cartItems.length === 0) {
            // Handle empty cart items
            return;
        }
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
    
        // Logo
        const logoWidth = 40;
        const logoHeight = 20;
        doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight); // Add your logo image
    
        // Title
        doc.setFontSize(20);
        doc.setFont('bold');
        doc.text('Order Invoice', 105, 20, { align: 'center' });
    
        // Order Details
        doc.setFontSize(14);
        doc.text(`Order ID: ${orderDetails._id}`, 10, 40);
        doc.text(`Order Status: ${orderDetails.orderStatus}`, 10, 50);
        doc.text(`Payment Status: ${orderDetails.paymentStatus}`, 10, 60);
        // Add more order details as needed
    
        // Shipping Address
        doc.setFontSize(16);
        doc.text('Shipping Address:', 10, 80);
        doc.setFontSize(12);
        doc.text(`${addressDetails.addressLine1}`, 10, 90);
        doc.text(`${addressDetails.city}, ${addressDetails.state}, ${addressDetails.country}`, 10, 100);
    
        // Table Header
        doc.setFillColor(220, 220, 220);
        doc.rect(10, 120, 190, 10, 'F');
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Item', 15, 125);
        doc.text('Quantity', 75, 125);
        doc.text('Price', 135, 125);
        doc.text('Total', 175, 125);
    
        // Table Body (Example data)
        let yOffset = 130;
        cartItems.forEach((item, index) => {
            doc.text(item.p_name.toString(), 15, yOffset + (index * 10));
            doc.text(item.quantity.toString(), 75, yOffset + (index * 10));
            doc.text(item.price.toFixed(2).toString(), 135, yOffset + (index * 10)); // Ensure price is formatted as string
            doc.text((item.quantity * item.price).toFixed(2).toString(), 175, yOffset + (index * 10)); // Ensure total is formatted as string
        });
        
        // Total Cost
        const totalCost = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        doc.setFontSize(16);
        doc.text(`Total: ${totalCost.toFixed(2).toString()}`, 10, yOffset + (cartItems.length * 10) + 10); // Ensure total cost is formatted as string
    
        // Download time and date
        const currentDate = new Date();
        const downloadDate = currentDate.toLocaleDateString();
        const downloadTime = currentDate.toLocaleTimeString();
        doc.setFontSize(12);
        doc.text(`Date and Time: ${downloadDate} at ${downloadTime}`, 10, yOffset + (cartItems.length * 10) + 20);
    
        doc.save('order_invoice.pdf');
    };
    return (
        <div className='flex h-screen'>
        {/* Sidebar */}
        <div className='bg-sideNavBackground w-1/5 p-4'>
             
        <Link  to="/mainDashboard">
        <div className="flex justify-center items-center mb-8">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </div>
        
        </Link>
          <hr className="border-gray-700 my-4"/>
          <div className='space-y-1'>
            <NavLink icon={dashboard} text="Order Dashboard" to="/order-dashboard" />
            <NavLink icon={dashboard} text="New Order Dashboard" to="/new-orders-dashboard" />
            <NavLink icon={dashboard} text="Manage Orders" to="/manage-orders-dashboard" />
            <NavLink icon={dashboard} text="Complete Orders" to="/complete-orders-dashboard" />
          </div>
        </div>
  
        {/* Main Content */}
        <div className="basis-4/5 bg-green-200">
          <AdminHeader />
        <div className="max-w-4xl mx-auto bg-white shadow-lg border p-6 rounded-lg my-7">
        {orderDetails && Object.keys(orderDetails).length > 0 && (
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-gray-600">Order Status: <span className={getStatusColor(orderDetails?.orderStatus)}>{orderDetails?.orderStatus}</span></div>
                    <div className="text-gray-600">Payment Status: <span className={getStatusColor(orderDetails?.paymentStatus)}>{orderDetails?.paymentStatus}</span></div>
                    <div className="text-gray-600">Order Date: {orderDetails?.date}</div>
                </div>
                <div className="text-right">
                    <div className="text-gray-800 font-bold">Order ID: {orderDetails._id}</div>
                    <div className="text-gray-600">Tracking ID: {orderDetails.trackingId}</div>
                    <div className="text-gray-600">Tracking Status: <span className={getStatusColor(orderDetails.trackingStatus)}>{orderDetails.trackingStatus}</span></div>
                </div>
            </div>
        )}
        <div className="mt-8">
            <div className="text-lg font-bold text-zinc-800 dark:text-dark mb-4">Shipping Address:</div>
            <div className="text-lg text-zinc-600 dark:text-zinc-400">
                {addressDetails && Object.keys(addressDetails).length > 0 && (
                    <>
                        <p>{addressDetails.addressLine1}</p>
                        <p>{addressDetails.city}, {addressDetails.state}, {addressDetails.country}</p>
                    </>
                )}
            </div>
        </div>
        <div className="mt-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-3 text-left text-zinc-800 dark:text-dark">Item</th>
                        <th className="px-4 py-3 text-left text-zinc-800 dark:text-dark">Quantity</th>
                        <th className="px-4 py-3 text-left text-zinc-800 dark:text-dark">Price</th>
                        <th className="px-4 py-3 text-left text-zinc-800 dark:text-dark">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td className="px-4 py-2">{item.p_name}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">{item.price}</td>
                            <td className="px-4 py-2">{(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-8 flex justify-between items-center">
            <div className="text-2xl font-bold text-zinc-800 dark:text-dark">Cost: {orderDetails?.totalPrice}</div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg" onClick={generatePDF}>
                Download PDF
            </button>
        </div>
    </div>
    </div>
    </div>
    
    );
}
function NavLink({ icon, text, to }) {
    return (
      <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
        <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
        <span className='text-lg font-semibold'>{text}</span>
      </Link>
    );
  }