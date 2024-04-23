import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Ordersummary() {
  const [orderDetails, setOrderDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [addressDetails, setAddressDetails] = useState({});
  const { orderId } = useParams();

  useEffect(() => {
    // Fetch order details using the order ID from URL parameters
    fetchOrderDetails(orderId);
  }, [orderId]);

  const fetchOrderDetails = (orderId) => {
    fetch(`/api/order/get/${orderId}`)
      .then(response => response.json())
      .then(data => {
        setOrderDetails(data);
        // Extract cart ID from order details and fetch cart items
        const cartId = data.cartId;
        fetchCartItems(cartId);
        // Fetch address details using the fetched order details
        fetchAddressDetails(data.addressId);
      })
      .catch(error => console.error('Error fetching order details:', error));
  };

  const fetchCartItems = (cartId) => {
    fetch(`/api/cart/get/${cartId}`)
      .then(response => response.json())
      .then(data => setCartItems(data.items))
      .catch(error => console.error('Error fetching cart items:', error));
  };

  const fetchAddressDetails = (addressId) => {
    fetch(`/api/address/${addressId}`)
      .then(response => response.json())
      .then(data => setAddressDetails(data))
      .catch(error => console.error('Error fetching address details:', error));
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
    <div>
      <h2>Order Summary</h2>
      {/* Render cart items details */}
      {cartItems.map(item => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total Price: ${item.price * item.quantity}</p>
        </div>
      ))}

      {/* Display total price, promotion price, total price to pay */}
      <p>Total Price: ${orderDetails.totalPrice}</p>
      <p>Promotion Price: ${orderDetails.promotionPrice}</p>
      <p>Total Price to Pay: ${orderDetails.totalPriceToPay}</p>

      {/* Display address details */}
      <p>Address: {addressDetails.address}</p>
      <p>City: {addressDetails.city}</p>
      <p>State: {addressDetails.state}</p>
      <p>Zip: {addressDetails.zip}</p>

      {/* Allow users to apply promo code */}
      <input type="text" placeholder="Enter promo code" />
      <button onClick={() => handleApplyPromoCode(promoCode)}>Apply</button>
    </div>
  );
}
