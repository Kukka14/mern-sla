import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);
    
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = () => {
        fetch(`/api/cart/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: currentUser._id })
        })
        .then(response => response.json())
        .then(data => setCartItems(data.items))
        .catch(error => console.error('Error fetching cart items:', error));
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

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
                    style: { background: "green", 
                  color: "white"}
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

    return (
      <div className="container mx-auto bg-white mt-24 rounded-3xl max-w-5xl">
            <div className="flex flex-col justify-center items-center py-12 w-auto">
                <h2 className="text-2xl font-bold my-4 text-center">Shopping Cart</h2>
                <ToastContainer />
                {cartItems.length === 0 ? (
                    <p className="text-gray-600 text-center">Your cart is empty</p>
                ) : (
                    <div className="bg-cartbackground w-[920px] mx-auto flex justify-center items-center rounded-3xl">
                        <table className="table-auto text-left text-sm font-medium w-[764px] m-4">
                            <thead className='bg-carttableheader rounded text-white'>
                                <tr>
                                    <th scope="col" className="px-2 py-2">Count</th>
                                    <th scope="col" className="px-2 py-2">Image</th>
                                    <th scope="col" className="px-2 py-2">Name</th>
                                    <th scope="col" className="px-2 py-2">Quantity</th>
                                    <th scope="col" className="px-2 py-2">Price</th>
                                    <th scope="col" className="px-2 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {cartItems.map((item, index) => (
                                    <tr key={item._id} className="border-b dark:border-neutral-500 bg-carttablerow my-5">
                                        <td className="px-2 py-2">{index + 1}</td>
                                        <td className="px-2 py-2">
                                            <img src={item.p_img[0]} alt={item.p_name} className="w-24 h-auto" />
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
            </div>
        </div>
    );
}