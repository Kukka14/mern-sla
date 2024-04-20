import  { useState, useEffect } from 'react';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = () => {
        fetch('/api/cart/get')
            .then(response => response.json())
            .then(data => setCartItems(data.items))
            .catch(error => console.error('Error fetching cart items:', error));
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

       const removeFromCart = (itemId) => {
   
     fetch(`/api/cart/removeItem/${itemId}`, {
       method: 'DELETE'
     })
     .then(response => {
       if (response.ok) {
     
         fetchCartItems();
       } else {
         console.error('Failed to remove item from cart');
       }
     })
     .catch(error => console.error('Error removing item from cart:', error));
  };

    return (
      <div className="container mx-auto">
      <h2 className="text-2xl font-bold my-4 text-center">Shopping Cart</h2>
      {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
          <table className="table-auto w-full mx-auto text-center">
              <thead>
                  <tr>
                      <th className="px-4 py-2">Product Name</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {cartItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-200">
                          <td className="px-4 py-2">{item.product}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">Rs.{item.price}.00</td>
                          <td className="px-4 py-2"><button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button></td>
                      </tr>
                  ))}
              </tbody>
          </table>
      )}
  </div>
);
}
 
