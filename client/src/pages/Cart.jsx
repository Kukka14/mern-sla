import React, { useState, useEffect } from 'react';

export default function Cart() {
   


  const [cartItems, setCartItems] = useState([]);

  
  const fetchCartItems = () => {
   
    fetch('/api/cart/getCart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart items:', error));
  };

 
  useEffect(() => {
    fetchCartItems();
  }, []);

  
//   const removeFromCart = (itemId) => {
   
//     fetch(`/api/cart/removeItem/${itemId}`, {
//       method: 'DELETE'
//     })
//     .then(response => {
//       if (response.ok) {
     
//         fetchCartItems();
//       } else {
//         console.error('Failed to remove item from cart');
//       }
//     })
//     .catch(error => console.error('Error removing item from cart:', error));
//   };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.productName}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Price: ${item.price}</span>
              {/* <button onClick={() => removeFromCart(item.id)}>Remove</button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


