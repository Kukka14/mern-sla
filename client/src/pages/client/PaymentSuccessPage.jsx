import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const PaymentSuccessPage = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [countdown, setCountdown] = useState(10); // Initial countdown value in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease countdown by 1 every second
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Update every second

    // Redirect to home page when countdown reaches 0
    if (countdown === 0) {
      navigate("/");
    }

    // Clear the timer if the component unmounts or if the link is clicked
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-8" />
      <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
      <p className="text-lg mb-4">Thank you for your purchase!</p>
      <p className="mt-4">Your payment details have been successfully processed.</p>
      
      {/* Countdown timer with Tailwind CSS */}
      <p className="mt-4 text-xl font-semibold text-gray-600">
        Redirecting to home page in <span className="text-red-500">{countdown}</span> seconds...
      </p>
      
      {/* Back to Home button */}
      <Link to="/" className="mt-8 inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
