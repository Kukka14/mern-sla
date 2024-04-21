import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';





export default function CartPopup() {
  const [open, setOpen] = useState(true)
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

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                        {cartItems.length === 0 ? (
             <div className="text-center">
             <p className="text-gray-600">Your cart is empty</p>
             <button
               type="button"
               className="font-medium text-indigo-600 hover:text-indigo-500"
               onClick={() => setOpen(false)}
             >
               Continue Shopping
               <span aria-hidden="true"> &rarr;</span>
             </button>
           </div>
          ) : (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((item, index) => (
                              <li  key={item._id}  className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.p_img[0]}
                                    alt={index + 1}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{item.p_name}</a>
                                      </h3>
                                      <p className="ml-4">Rs.{item.price*item.quantity}.00</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">Qty 1 =Rs.{item.price}.00</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500 font-semibold">Qty {item.quantity}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => removeFromCart(item._id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
          )}
                        </div>
                      </div>
                    </div>
                    {cartItems.length !== 0 && (

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs.{totalPrice}.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                       <Link to="/cart"><button  type="button"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={() => setOpen(false)}
                        >
                          View Cart 
                        </button></Link> 
                      </div>
                    
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                         
                          <Link to="/product"><button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button></Link>
                        </p>
                      </div>
                    </div>
                    )}
                  </div>
               
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


