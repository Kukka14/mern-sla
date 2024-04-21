import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ShippingAddress() {
  const { currentUser } = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    fetch(`/api/address/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: currentUser._id })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log addresses to console
        setAddresses(data.addresses ); // Ensure addresses is initialized as an array
       // Reset error state
      })
      .catch(error => {
        console.error('Error fetching addresses:', error);
        setError('Failed to fetch addresses. Please try again.'); // Set error state
      });
  }, [currentUser._id]);

  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <div className="container mx-auto bg-white mt-16 rounded-3xl max-w-5xl">
      <div className="py-8">
        <h2 className="text-2xl font-bold my-4 text-center">Shipping Address</h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Render error message */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {addresses.map(address => (
            <div key={address._id} className="bg-gray-100 p-4 rounded-md">
              <label htmlFor={address._id}>
                <input
                  type="radio"
                  id={address._id}
                  name="selectedAddress"
                 checked={selectedAddress === address._id}
                  onChange={() => handleAddressSelection(address._id)}
                />
                <div className="flex flex-col">
                  <div className="font-bold">{address.addressLine1}</div>
                  <div>{address.addressLine2}</div>
                  <div>{address.city},
                   {address.state},
                    {address.country}, 
                   {address.postalCode}</div>
                </div>3
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
            <div>
          <Link to="/new-address" className="text-blue-500 hover:underline">Add New Address</Link>
          </div>
          <div>
          <Link to={selectedAddress ? "/payment" : "/shipping"} className={`bg-blue-500 ${selectedAddress ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"} text-white font-bold py-2 px-4 rounded`}>
            Continue to {selectedAddress ? "Payment" : "Select an Address"}
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
