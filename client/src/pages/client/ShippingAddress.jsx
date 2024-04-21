import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ShippingAddress() {
  const { currentUser } = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

useEffect(() => {
    // Fetch user's addresses from backend
    fetch(`/api/user/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: currentUser._id })
    })
        .then(response => response.json())
        .then(data => setAddresses(data.addresses))
        .catch(error => console.error('Error fetching addresses:', error));
}, [currentUser._id]);

  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <div className="container mx-auto bg-white mt-16 rounded-3xl max-w-5xl">
      <div className="py-8">
        <h2 className="text-2xl font-bold my-4 text-center">Shipping Address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {addresses.map(address => (
            <div key={address.id} className="bg-gray-100 p-4 rounded-md">
              <label htmlFor={address.id}>
                <input
                  type="radio"
                  id={address.id}
                  name="selectedAddress"
                  checked={selectedAddress === address.id}
                  onChange={() => handleAddressSelection(address.id)}
                />
                <div className="flex flex-col">
                  <span className="font-bold">{address.name}</span>
                  <span>{address.street}</span>
                  <span>{address.city}, {address.state}, {address.country}, {address.zip}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <Link to="/new-address" className="text-blue-500 hover:underline">Add New Address</Link>
          <Link to={selectedAddress ? "/payment" : "/shipping"} className={`bg-blue-500 ${selectedAddress ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"} text-white font-bold py-2 px-4 rounded`}>
            Continue to {selectedAddress ? "Payment" : "Select an Address"}
          </Link>
        </div>
      </div>
    </div>
  );
}


