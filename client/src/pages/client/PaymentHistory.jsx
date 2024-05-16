import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './../../images/logo2.png';
import jsPDF from 'jspdf';

export default function OrderHistory() {
  const { currentUser } = useSelector((state) => state.user);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchPayments();
    }
  }, [currentUser]);

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payment/paymentdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUser._id })
      });
      const data = await response.json();
      setPayments(data.payments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const downloadInvoice = (payment) => {
    const doc = new jsPDF();
  
    // Add background color
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
    // Add title
    doc.setTextColor(0, 102, 0);
    doc.setFontSize(24);
    doc.text('Invoice', 105, 20);
  
    // Add logo (replace 'logo.png' with your actual logo file)
    
   
    doc.addImage(logo, 'PNG', 15, 10, 60, 20);
  
    // Add payment details
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Payment ID: ${payment._id}`, 15, 40);
    doc.text(`Date: ${new Date(payment.paymentDate).toLocaleDateString()}`, 15, 50);
    doc.text(`Amount: ${payment.paymentAmount}`, 15, 60);
  
    // Save the PDF
    doc.save(`invoice_${payment._id}.pdf`);
  }
  return (
    <div className="container mx-16 px-28 py-8 bg-green-100"> 
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-green-900 mb-8">Payment History</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 px-72">
        {payments.map((payment) => (
          <div key={payment._id} className="bg-white border border-zinc-300 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-4">
                <span className="text-zinc-800 font-semibold">Payment ID: {payment._id}</span>
                <span className="text-green-500">Status: <span className="font-semibold">{payment.paymentStatus}</span></span>
                <span>User: {currentUser.username}</span>
              </div>
              <div className="flex flex-col items-end items">
                <span className="text-zinc-600 text-sm">{new Date(payment.paymentDate).toLocaleDateString()}</span>
                <div className="text-lg font-bold my-1">Amount: {payment.paymentAmount}</div>
                <div className='my-1 py-2'>
                  <button onClick={() => downloadInvoice(payment)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
