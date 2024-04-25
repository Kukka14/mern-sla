import stripe from 'stripe';
import Order from '../models/order.model.js';
import Payment from '../models/payment.model.js';

export const getCheckoutSession = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        
        // Check if orderId is valid
        if (!orderId) {
            return res.status(400).json({ success: false, message: 'orderId is required' });
        }

        // Find the order by orderId
        const order = await Order.findById(orderId);

        // Check if order exists
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Calculate total price to pay
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
                        currency: 'usd',
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
