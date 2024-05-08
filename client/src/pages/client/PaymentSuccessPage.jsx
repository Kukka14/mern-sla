
import { Link } from "react-router-dom";


export  default function PaymentSuccessPage () {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-4">
        Thank you for your purchase. Your order has been successfully
        processed.
      </p>
      <div className="mb-4">
        {/* Display order summary or any other relevant information */}
        {/* For example: */}
        {/* <p>Order ID: ABC123</p> */}
        {/* <p>Total Amount: $100</p> */}
      </div>
      <Link to="/" className="text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}

