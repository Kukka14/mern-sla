

import Cart from'../models/cart.model.js';
import Order from'../models/order.model.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    console.log(userId);

    // Find the active cart for the user
    const activeCart = await Cart.findOne({ user: userId, status: 'active' });

    if (!activeCart) {
      
      return res.status(404).json({ error: 'No active cart found for the user' });
    }

    // Calculate total price
    const totalPrice = activeCart.total;

    // Update the status of the active cart to 'inactive'
    await Cart.findOneAndUpdate(
      { _id: activeCart._id },
      { $set: { status: 'completed' } }
    );

    // Create a new order
    const order = new Order({
      userId,
      addressId,
      cartId: activeCart._id,
      totalPrice,
      orderStatus: 'pending',
      paymentStatus: 'pending'
    });

    // Save the order
    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
};