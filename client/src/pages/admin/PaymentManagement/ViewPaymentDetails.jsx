import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import User from '../../../../../api/models/user.model';

const AdminPage = () => {
  const [payments, setPayments] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchedPayments, setSearchedPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('/api/payment/:userId');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleDelete = async (paymentId) => {
    try {
      await axios.delete(`/api/payment/delete/${paymentId}`);
      setPayments(payments.filter(payment => payment._id !== paymentId));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/payment/search?date=${searchDate}`);
      setSearchedPayments(response.data);
    } catch (error) {
      console.error('Error searching payments:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <div className="flex items-center justify-end mb-4">
        <div className="relative">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border rounded mr-4 px-2 py-1 pl-8"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Transaction Descri</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(searchedPayments.length > 0 ? searchedPayments : payments).map(payment => (
              <tr key={payment._id}>
                <td className="border px-4 py-2">{payment.userName}</td>
                <td className="border px-4 py-2">{payment.orderId}</td>
                <td className="border px-4 py-2">{payment.transactionId}</td>
                <td className="border px-4 py-2">${(payment.paymentAmount / 100).toFixed(2)}</td>
                <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(payment._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
