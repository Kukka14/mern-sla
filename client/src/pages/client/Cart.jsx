import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';  


export default function Cart() {
  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);
    
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 

    const fetchCartItems = () => {
        fetch(`/api/cart/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: currentUser._id })
        })
        .then(response => response.json())
        .then(data => {
          setCartItems(data.items);
          // Calculate total price when cart items are fetched
          const totalPrice = data.items.reduce((total, item) => total + (item.price * item.quantity), 0);
          setTotalPrice(totalPrice);
      })
        .catch(error => console.error('Error fetching cart items:', error));
    };

    useEffect(() => {
        fetchCartItems();
    }, );

    const removeFromCart = (itemId) => {
        fetch(`/api/cart/remove-from-cart/${currentUser._id}/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchCartItems();
                toast.success('Item removed from cart successfully');
            } else {
                console.error('Failed to remove item from cart');
            }
        })
        .catch(error => console.error('Error removing item from cart:', error));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error('Quantity must be at least 1', {
                position: "bottom-left"
            });
            return;
        }

        fetch(`/api/cart/updateQuantity/${currentUser._id}/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        })
        .then(response => {
            if (response.ok) {
                fetchCartItems();
                toast.success('Quantity updated successfully', {
                    position: "bottom-left",
                    style: { background: "green", color: "white" }
                });
            } else {
                toast.error('Failed to update quantity', {
                    position: "bottom-left"
                });
                console.error('Failed to update item quantity');
            }
        })
        .catch(error => {
            toast.error('Error updating quantity', {
                position: "bottom-left"
            });
            console.error('Error updating item quantity:', error);
        });
    };
   
    const checkout = () => {
      console.log('Initiating checkout...');
      fetch(`/api/cart/checkout`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ totalPrice: totalPrice, userId: currentUser._id })
      })
      .then(response => {
          if (response.ok) {
              console.log('Checkout successful');
              navigate('/shipping-address');
          } else {
              console.error('Failed to checkout');
          }
      })
      .catch(error => console.error('Error during checkout:', error));
  }
  

    return (
        <div className="container mx-auto bg-white mt-16 rounded-3xl max-w-5xl">
          <div className="flex flex-col justify-center items-center py-8 w-auto">
          <ToastContainer />
            <h2 className="text-2xl font-bold my-4 text-center">Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center">
                  <p className="text-gray-600 text-center">Your cart is empty</p>
                  <div className="flex flex-row justify-center items-center w-[800px] mx-auto mt-8">
                    <Link to="/"><button className='bg-backgreen4 hover:bg-green-700 text-white font-bold py-2 px-6  rounded'>Back to Store</button></Link>
                  </div>
                </div>
            ) : (
              <div className="max-content mx-auto flex justify-center items-center rounded-3xl">
                <table className="table-auto text-left text-sm font-medium w-[764px] m-5 rounded-2xl overflow-hidden">
                  {/* Table Header */}
                  <thead className="bg-carttableheader text-white m-5 py-5">
                    <tr className="rounded my-4 py-8">
                      <th scope="col" className="px-3 py-3">Count</th>
                      <th scope="col" className="px-3 py-3">Image</th>
                      <th scope="col" className="px-3 py-3">Name</th>
                      <th scope="col" className="px-3 py-3">Quantity</th>
                      <th scope="col" className="px-3 py-3">Price</th>
                      <th scope="col" className="px-3 py-3">Total Price</th>
                      <th scope="col" className="px-3 py-3">Action</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody className="text-center">
                    {cartItems.map((item, index) => (
                      <tr key={item._id} className="bg-cartbackground my-5 className='rounded items-center'">
                        <td className="px-2 py-2">{index + 1}</td>
                        <td className="px-2 py-2">
                          <img src={item.p_img[0]} alt={item.p_name} className="w-24 h-20 rounded-md object-cover" />
                        </td>
                        <td className="px-2 py-2">{item.p_name}</td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, e.target.value)}
                            className="w-12 border rounded p-1"
                          />
                        </td>
                        <td className="px-2 py-2">Rs.{item.price}.00</td>
                         <td className="px-2 py-2">Rs.{item.price*item.quantity}.00</td>
                        <td className="px-2 py-2">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Conditionally render checkout button */}
            {cartItems.length > 0 && (
        <div className="flex flex-row justify-end place-items-start w-[800px] mx-auto my-4">
          <span className="font-bold text-gray-700">Subtotal:</span>
          <span className="text-xl font-bold text-green-700">Rs.{totalPrice}.00</span>
        </div>
      )}
      
      {/* Conditionally render checkout button */}
      {cartItems.length > 0 && (
        <div className='flex flex-row justify-between items-center w-[800px] mx-auto my-20'>
         <button className='bg-backgreen4 hover:bg-green-700 text-white font-bold py-2 px-6 rounded'>back</button>
          <button className='bg-backgreen4 hover:bg-green-700 text-white font-bold py-2 px-6  rounded' onClick={checkout}>Checkout</button>
        </div>
      )}
             
          </div>
          <ToastContainer />
        </div>
      );
}
