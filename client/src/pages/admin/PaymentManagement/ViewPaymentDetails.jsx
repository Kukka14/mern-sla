import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dashboard from './../../../images/icons8-arrow-50 (1).png';
import logo from './../../../images/logo2.png';
import AdminHeader from '../../../components/AdminHeader';

export default function ManagePayment() {

  const [payments, setPayments] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    getAllPayments();
  }, []);

  const getAllPayments = async () => {
    try {
      const response = await fetch('/api/payment/all');
      const data = await response.json();
      const paymentsWithUserNames = await Promise.all(
        data.payments.map(async (payment) => {
          const orderDetails = await fetchOrderDetails(payment.orderId);
          const userDetails = await fetchUserDetails(orderDetails.userId);
          return {
            ...payment,
            paymentStatus: orderDetails.paymentStatus,
            userDetails: userDetails
          };
        })
      );
      setPayments(paymentsWithUserNames);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`/api/order/get/${orderId}`);
      const orderData = await response.json();
      return orderData.order;
    } catch (error) {
      console.error('Error fetching order details:', error);
      return null;
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/user/name/${userId}`);
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
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
      getAllPayments(); 
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await fetch(`/api/payment/delete/${paymentId}`, { method: 'DELETE' });
      await getAllPayments(); // Wait for payments to be updated
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredPayments = payments.filter((payment) =>
    Object.values(payment).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='bg-sideNavBackground w-1/5 p-4'>
        <Link to="/mainDashboard">
          <div className="flex justify-center items-center mb-8">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </div>
        </Link>
        <hr className="border-gray-700 my-4"/>
        <div className='space-y-1'>
          <NavLink icon={dashboard} text="Payment Dashboard" to="/payment-dashboard" />
          <NavLink icon={dashboard} text="Manage Payment" to="/paymentdetails" />
         
        </div>
      </div>

      {/* Main Content */}
      <div className="basis-4/5">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <h1 className="text-center text-3xl font-bold mb-4 w-1/3 border-b-2 border-green-600 py-2">Manage Payments</h1>
          </div>
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="Search by paymentId or userId or amount"
              value={searchKeyword}
              onChange={handleSearchChange}
              className="bg-green-100 w-80 rounded-lg border border-green-300 h-10 px-4 mr-4 focus:outline-none"
            />
          </div>
          {/* Render Payment data table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-300">
                  <th className="px-4 py-2 text-left rounded-tl-lg">Payment Id</th>
                  <th className="px-4 py-2 text-left">User Name</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment._id} className="bg-green-100">
                    <td className="border px-4 py-2">#{payment._id.slice(-6)}</td>
                    <td className="border px-4 py-2">{payment.userDetails ? payment.userDetails.username : 'Unknown'}</td>
                    <td className="border px-4 py-2">{payment.paymentAmount}</td>
                    <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>

                    <td className="border px-2 py-1">
                      <button
                        onClick={() => handlePaymentStatusChange(payment.orderId, payment.paymentStatus === 'pending' ? 'paid' : 'pending')}
                        className={`px-2 py-1 rounded ${
                          payment.paymentStatus === 'pending' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                        }`}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {payment.paymentStatus}
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeletePayment(payment._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded mb-1 hover:bg-red-600 "
                      >
                        Delete
                      </button>
                      {/* You can add a button to view payment details here */}
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

function NavLink({ icon, text, to }) {
  return (
    <Link to={to} className='flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover '>
      <img src={icon} alt={text} className='w-6 h-6 mr-4'/>
      <span className='text-lg font-semibold'>{text}</span>
    </Link>
  );
}
