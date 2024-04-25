

import Cart from'../models/cart.model.js';
import Order from'../models/order.model.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    console.log(userId);

    
    const activeCart = await Cart.findOne({ user: userId, status: 'active' });

    if (!activeCart) {
      
      return res.status(404).json({ error: 'No active cart found for the user' });
    }

    
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

export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

   
    
    res.status(200).json({ order });
  } catch (error) {
    console.error('Error getting order details:', error);
    res.status(500).json({ error: 'An error occurred while getting the order details' });
  }
};

export const getAllDeliveredOrders = async (req, res) => {
  try {
    const deliveredOrders = await Order.find({ orderStatus: 'completed', paymentStatus: 'paid', trackingStatus: 'delivered' });

    res.status(200).json({ orders: deliveredOrders });
  } catch (error) {
    console.error('Error getting delivered orders:', error);
    res.status(500).json({ error: 'An error occurred while getting the delivered orders' });
  }
};

export const getNewOrders = async (req, res) => {
  try {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000);

    const newOrders = await Order.find({
      orderStatus: 'pending',
      createdAt: { $gte: sevenDaysAgo }
    });

    res.status(200).json({ orders: newOrders });
  } catch (error) {
    console.error('Error getting new orders:', error);
    res.status(500).json({ error: 'An error occurred while getting the new orders' });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error getting all orders:', error);
    res.status(500).json({ error: 'An error occurred while getting all orders' });
  }
};
export const searchOrder = async (req, res) => {
  try {
    const { keyword } = req.query;

    const orders = await Order.find({
      $or: [
        { userId: { $regex: keyword, $options: 'i' } },
        { addressId: { $regex: keyword, $options: 'i' } },
        { orderStatus: { $regex: keyword, $options: 'i' } },
        { paymentStatus: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error searching orders:', error);
    res.status(500).json({ error: 'An error occurred while searching orders' });
  }
};

