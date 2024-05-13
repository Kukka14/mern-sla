import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import logo from './../../../images/logo2.png';
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import AdminHeader from '../../../components/AdminHeader';

export default function ManageOrder() {
  const [orders, setOrders] = useState([]); // State to hold orders data
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    // Fetch all orders when component mounts
    getAllOrders();
  }, []);

  // Function to fetch all orders
  const getAllOrders = async () => {
    try {
      const response = await fetch('/api/order/all');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  // Function to handle download report button click
  const handleDownloadReport = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Logo
    const imgData = logo;
    const logoWidth = 80;
    const logoHeight = 30;
    doc.addImage(imgData, 'PNG', 10, 10, logoWidth, logoHeight);

    // Title
    doc.setFontSize(25);
    doc.setFont('bold');
    doc.text('Manage Orders Report', 165, 25, { align: 'center' });

    // Table
    doc.autoTable({
      startY: 60,
      head: [['Order ID', 'Cart ID', 'User ID', 'Date', 'Total Price', 'Order Status', 'Payment Status', 'Tracking Status']],
      body: orders.map(order => [
        order._id,
        order.cartId,
        order.userId,
        formatDate(order.createdAt),
        order.totalPrice,
        order.orderStatus,
        order.paymentStatus,
        order.trackingStatus
      ]),
    });

    // Download time and date
    const currentDate = new Date();
    const downloadDate = currentDate.toLocaleDateString();
    const downloadTime = currentDate.toLocaleTimeString();
    doc.setFontSize(12);
    doc.text(`Date and Time: ${downloadDate} at ${downloadTime}`, 10, doc.lastAutoTable.finalY + 10, { align: 'left' });

    doc.save('order_report.pdf');
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Function to filter orders based on search keyword
  const filteredOrders = orders.filter((order) =>
    Object.values(order).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  // Function to handle order deletion
  const handleDelete = async (orderId) => {
    try {
      await fetch(`/api/order/delete/${orderId}`, { method: 'DELETE' });
      getAllOrders(); // Fetch updated orders after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };

  const handleTrackingStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`/api/order/update-tracking-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackingStatus: newStatus })
      });
      getAllOrders(); // Fetch updated orders after status change
    } catch (error) {
      console.error('Error updating tracking status:', error);
    }
  };

  const handlePaymentStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`/api/order/update-payment-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentStatus: newStatus })
      });
      getAllOrders(); // Fetch updated orders after status change
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const getNextTrackingStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'processing';
      case 'processing':
        return 'shipped';
      case 'shipped':
        return 'delivered';
      case 'delivered':
        return 'pending';
      default:
        return currentStatus; // Loop back to 'pending' status if already 'delivered' or if unknown status
    }
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
      <div className="basis-4/5">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">Manage Orders</h1>
          </div>
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="orderId or userId or cartId"
              value={searchKeyword}
              onChange={handleSearchChange}
              className="bg-green-100 w-80 rounded-lg border border-green-300 h-10 px-4 mr-4 focus:outline-none"
            />
          </div>
          <button onClick={handleDownloadReport} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
            Download Report (PDF)
          </button>
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-300">
                  <th className="px-4 py-2 text-left rounded-tl-lg">Order Id</th>
                  <th className="px-4 py-2 text-left">Cart Id</th>
                  <th className="px-4 py-2 text-left">User Id</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Total Price</th>
                  <th className="px-4 py-2 text-left">Order Status</th>
                  <th className="px-4 py-2 text-left">Payment Status</th>
                  <th className="px-4 py-2 text-left">Tracking Status</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className= "bg-green-100">
                    <td className="border px-4 py-2">{order._id}</td>
                    <td className="border px-4 py-2">{order.cartId}</td>
                    <td className="border px-4 py-2">{order.userId}</td>
                    <td className="border px-4 py-2">{formatDate(order.createdAt)}</td>
                    <td className="border px-4 py-2">{order.totalPrice}</td>
                    <td className="border px-2 py-1" style={{ backgroundColor: order.orderStatus === 'pending' ? 'red' : 'green', color: 'white', fontWeight: 'bold' }}>{order.orderStatus}</td>

                    <td className="border px-2 py-1">
                      <button
                        onClick={() => handlePaymentStatusChange(order._id, order.paymentStatus === 'pending' ? 'paid' : 'pending')}
                        className={`px-2 py-1 rounded ${
                          order.paymentStatus === 'pending' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {order.paymentStatus}
                      </button>
                    </td>
                    <td className="border px-2 py-1">
                      <button
                        onClick={() => handleTrackingStatusChange(order._id, getNextTrackingStatus(order.trackingStatus))}
                        className={`px-2 py-1 rounded ${
                          order.trackingStatus === 'pending' ? 'bg-red-500 text-white' :
                          order.trackingStatus === 'processing' ? 'bg-yellow-500 text-black' :
                          order.trackingStatus === 'shipped' ? 'bg-blue-500 text-white' :
                          'bg-green-500 text-white'
                        }`}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {order.trackingStatus}
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded mb-1 hover:bg-red-600 "
                        >
                          Delete
                        </button>
                        <Link to={`/order/${order._id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-600 text-center">
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
      <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
      <span className='text-lg font-semibold'>{text}</span>
    </Link>
  );
}
