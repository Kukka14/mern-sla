import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

export default function ShippingAddress() {
  
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    fetchAddresses();
  },);

  const fetchAddresses = () => {
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
        setAddresses(data.addresses);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching addresses:', error);
        setError('Failed to fetch addresses. Please try again.');
      });
  };

  const handleAddressSelection = (addressId) => {
    setSelectedAddress(addressId);
  };

  const toggleAddAddressForm = () => {
    setShowAddAddressForm(prevState => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/address/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser._id,
        ...newAddress
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create address');
        }
        return response.json();
      })
      .then(data => {
        console.log('Address created successfully:', data);
        fetchAddresses(); // Fetch updated list of addresses
        setNewAddress({
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        }); // Clear form fields
        setShowAddAddressForm(false); // Hide the form
      })
      .catch(error => {
        console.error('Error creating address:', error);
        setError('Failed to create address. Please try again.');
      });
  };

  const handleCheckout = () => {
    // Create a new order
    fetch(`/api/order/create`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      userId: currentUser._id,
      addressId: selectedAddress
      })
    })
      .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      return response.json();
      })
      .then(data => {
      console.log('Order created successfully:', data.order);
      console.log('Order ID:', data.order._id);

      navigate(`/order-summary/orderId:${data.order._id}`);
      })
      .catch(error => {
      console.error('Error creating order:', error);
      });
  };
  const handleGoBack = () => {
    navigate('/cart');
  };

  return (
    <div className="container mx-auto bg-white mt-16 rounded-3xl max-w-5xl">
      <div className="py-8">
        <h2 className="text-2xl font-bold my-4 text-center">Shipping Address</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {addresses === undefined && <p className="text-red-500 text-center">No addresses found. Please add a new address.</p>}
        {addresses && addresses.length === 0 && <p className="text-red-500 text-center">No addresses found. Please add a new address.</p>}

        <div className="grid grid-cols-3 gap-6 mx-9 ">
          {addresses && addresses.map(address => (
            <div key={address._id} className="bg-gray-100 p-4 rounded-md hover:bg-gray-200">
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
                  <div>
                    {address.city}, <br/>{address.state},<br/> {address.country},<br/> {address.postalCode}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
        {showAddAddressForm ? (
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="mx-5 my-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                  <input type="text" id="addressLine1" name="addressLine1" value={newAddress.addressLine1} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                  <input type="text" id="addressLine2" name="addressLine2" value={newAddress.addressLine2} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" id="city" name="city" value={newAddress.city} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <input type="text" id="state" name="state" value={newAddress.state} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" id="postalCode" name="postalCode" value={newAddress.postalCode} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <input type="text" id="country" name="country" value={newAddress.country} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
              <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
                Add Address
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-6 mx-7">
            <button onClick={toggleAddAddressForm} className="text-blue-500 hover:underline">Add New Address</button>
          </div>
        )}
        <div className="flex justify-between items-center mt-6 mx-5">
          <button onClick={handleGoBack} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Back to Cart
          </button>
          <button onClick={handleCheckout} className={`bg-backgreen4 ${selectedAddress ? "hover:bg-green-900" : "opacity-50 cursor-not-allowed"} text-white font-bold py-2 px-4 rounded`}>
            Continue to {selectedAddress ? "Payment" : "Select an Address"}
          </button>
        </div>
      </div>
    </div>
  );
}