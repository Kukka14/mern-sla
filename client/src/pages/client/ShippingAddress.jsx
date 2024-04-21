import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

export default function ShippingAddress() {
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
  }, [currentUser._id]);

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
      console.log('Order created successfully:', data);
      // Navigate to the payment page or any other appropriate page
      })
      .catch(error => {
      console.error('Error creating order:', error);
      });
  };

  return (
    <div className="container mx-auto bg-white mt-16 rounded-3xl max-w-5xl">
      <div className="py-8">
        <h2 className="text-2xl font-bold my-4 text-center">Shipping Address</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
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
                  <div>
                    {address.city}, {address.state}, {address.country}, {address.postalCode}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>
        {showAddAddressForm ? (
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="addressLine1">Address Line 1</label>
                  <input type="text" id="addressLine1" name="addressLine1" value={newAddress.addressLine1} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="addressLine2">Address Line 2</label>
                  <input type="text" id="addressLine2" name="addressLine2" value={newAddress.addressLine2} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" value={newAddress.city} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <input type="text" id="state" name="state" value={newAddress.state} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="postalCode">Postal Code</label>
                  <input type="text" id="postalCode" name="postalCode" value={newAddress.postalCode} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="country">Country</label>
                  <input type="text" id="country" name="country" value={newAddress.country} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                Add Address
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-6">
            <button onClick={toggleAddAddressForm} className="text-blue-500 hover:underline">Add New Address</button>
          </div>
        )}
        <div className="flex justify-between items-center mt-6">
          <button onClick={handleCheckout} className={`bg-blue-500 ${selectedAddress ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"} text-white font-bold py-2 px-4 rounded`}>
            Continue to {selectedAddress ? "Payment" : "Select an Address"}
          </button>
        </div>
      </div>
    </div>
  );
}
