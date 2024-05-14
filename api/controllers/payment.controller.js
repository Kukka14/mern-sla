import stripe from 'stripe';
import Order from '../models/order.model.js';
import Payment from '../models/payment.model.js';

export const getCheckoutSession = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        
       
        if (!orderId) {
            return res.status(400).json({ success: false, message: 'orderId is required' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

       
        const totalPriceToPay = parseInt(order.totalPrice); // Example value, replace it with your actual calculation
        const totalPriceToPayInCents = Math.round(totalPriceToPay * 100);

        // Initialize Stripe
        const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

        // Create a checkout session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: '',
                        unit_amount: totalPriceToPayInCents,
                        product_data: {
                            name: 'Your Product Name',
                            description: 'Your Product Description'
                        }
                    },
                    quantity: 1
                }
            ],
            success_url: 'http://localhost:5173/paymentsuccess',
            cancel_url: 'http://localhost:5173/paymentfailed',
        });

        // Save payment details
        const payment = new Payment({
            userId: order.userId,
            orderId: order._id,
            transactionId: session.id,
            paymentAmount: totalPriceToPay
        });

        await payment.save();

        // Send session URL to client
        res.json({ success: true, url:session.url});
        
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const getAllPayments = async (req, res) => {
  try {
      const payments = await Payment.find();
      res.json({ payments });
  } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
  export const deletePayment = async (req, res) => {
    const { paymentId } = req.params;
    try {
      await Payment.findByIdAndDelete(paymentId);
      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      console.error('Error deleting payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const getUserPayments = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const payments = await Payment.find({ userId });
      res.json({ payments });
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getpayments= async (req, res) => {
    try {
      const payments = await Payment.find();
      res.json({ payments });
    } catch (error) {
      console.error('Error fetching payment data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
