

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
    const deliveredOrders = await Order.find({ orderStatus: 'completed', paymentStatus: 'paid', trackingStatus: 'delivered' })
      .sort({ createdAt: -1 }); // Sort by createdAt field in descending order

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
    const orders = await Order.find({orderStatus: 'pending'});

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

export const changeTrackingStatus = async (req, res) => {
  try {
    const { orderId, trackingStatus } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { trackingStatus } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Tracking status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error changing tracking status:', error);
    res.status(500).json({ error: 'An error occurred while changing the tracking status' });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'An error occurred while deleting the order' });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { paymentStatus }, { new: true });

    res.status(200).json({ message: 'Payment status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'An error occurred while updating the payment status' });
  }
};

// Controller function to update tracking status
export const updateTrackingStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { trackingStatus } = req.body;

    let nextTrackingStatus = trackingStatus;
    let orderStatus = 'pending'; // Default order status

    if (trackingStatus === 'delivered') {
      // Check if payment is paid
      const order = await Order.findById(orderId);
      if (order.paymentStatus === 'paid') {
        // If payment is paid and tracking status is delivered, set order status to completed
        orderStatus = 'completed';
      }
    }

    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { trackingStatus: nextTrackingStatus, orderStatus },
      { new: true }
    );

    res.status(200).json({ message: 'Tracking status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating tracking status:', error);
    res.status(500).json({ error: 'An error occurred while updating the tracking status' });
  }
};
export const getOrderCount = async (req, res) => {
  try {
    // Count all orders
    const orderCount = await Order.countDocuments();

    res.status(200).json({ orderCount });
  } catch (error) {
    console.error('Error getting order count:', error);
    res.status(500).json({ error: 'An error occurred while getting the order count' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'An error occurred while fetching user orders' });
  }
};



