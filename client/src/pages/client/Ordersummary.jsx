import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function Ordersummary() {
  const [orderDetails, setOrderDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [addressDetails, setAddressDetails] = useState({});
  const { orderId } = useParams();

  console.log('Success! Got ID:', orderId);
  const promoCode = "";


  useEffect(() => {
    // Fetch order details using the order ID from URL parameters
    fetchOrderDetails(orderId);
  }, [orderId]);

  const fetchOrderDetails = (orderId) => {
    // Remove any extra characters from the orderId
    const cleanOrderId = orderId.split(':')[1]; // Assuming the orderId is in the format "orderId:..."
    fetch(`/api/order/get/${cleanOrderId}`)
      .then(response => response.json())
      .then(data => {
        setOrderDetails(data.order);
        console.log('Order details received:', data);
        const cartId = data.order.cartId;
        fetchCartItems(cartId);
        fetchCartItems(cartId);
        console.log('cartId:', cartId);
        fetchAddressDetails(data.order.addressId);
        console.log('addressId:', data.order.addressId);
      })
      .catch(error => console.error('Error fetching order details:', error));
  };

  const fetchCartItems = async (cartId) => {
    fetch(`/api/cart/getcart`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({cartId})
  })
  .then(response => response.json())
  .then(data => {
    setCartItems(data.items);
    console.log('Cart items received:', data.items);
  
  
})
  .catch(error => console.error('Error fetching cart items:', error));
};

  const fetchAddressDetails = async (addressId) => {
    try {

      fetch(`/api/address/getdetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ addressId })
    })
    .then(response => response.json())
    .then(data => {
      setAddressDetails(data.address);
      console.log('address received:', data.address );
    
    })
    } catch (error) {
      console.error('Error fetching address details:', error);
    }
  };

  const handleApplyPromoCode = (promoCode) => {
    // Apply promo code logic
    fetch(`/api/promo/apply?code=${promoCode}`)
      .then(response => response.json())
      .then(data => {
        // Update total price to pay based on promo code
        setOrderDetails(prevOrderDetails => ({
          ...prevOrderDetails,
          totalPriceToPay: data.totalPriceToPay
        }));
      })
      .catch(error => console.error('Error applying promo code:', error));
   
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Order Summary</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className=' items-start shadow-md mb-4 rounded-lg'>
          <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
          <div className='items-start bg-slate-200 rounded-md mx-4 px-3'>
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center shadow-sm mb-4">
                <img src={item.p_img[0]} alt={item.p_name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4">
                  <h4 className="font-semibold">{item.p_name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total Price: ${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div >
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <div>
            <p>Total Price: ${orderDetails.totalPrice}</p>
            <p>Promotion Price: ${orderDetails.promotionPrice}</p>
            <p>Total Price to Pay: ${orderDetails.totalPriceToPay}</p>
          </div>
          <h3 className="text-xl font-semibold mt-8 mb-4">Shipping Address</h3>
          <div>
            <p>Address: {addressDetails.addressLine1}</p>
            <p>City: {addressDetails.city}</p>
            <p>State: {addressDetails.state}</p>
            <p>Zip: {addressDetails.postalCode}</p>
            <p>Country: {addressDetails.country}</p>
          </div>
          <div className="mt-8">
            <input type="text" placeholder="Enter promo code" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
            <button onClick={() => handleApplyPromoCode(promoCode)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">Apply</button>
          </div>
          <div className="mt-8">
            <button  className="px-8 py-3 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}