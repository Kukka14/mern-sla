import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
import User from '../models/user.model.js';
import Order from "../models/order.model.js";
import Payment from "../models/payment.model.js";

export const getCheckoutSession = async (req, res) => {
    try {
        const orderId = req.body; // Extract the actual order ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Calculate the total price to pay, subtracting any promotion price
        const totalPriceToPay = order.total - order.promotionPrice;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `/paymentsuccess`,
            cancel_url: `/paymentfailed`,
            user_email: user.email,
            client_reference_id: order._id,
            line_items: [
                {
                    price_data: {
                        currency: 'lkr',
                        unit_amount: Math.round(totalPriceToPay * 100), // Convert to cents
                        product_data: {
                            name: user.name,
                            description: doctor.email
                        }
                    },
                    quantity: 1
                }
            ]
        });
        
        const payment = new Payment({
            userId: order.userId,
            orderId: order._id,
            transactionId: session.id,
            paymentAmount: order.total
        });

        await payment.save();

        res.status(200).json({ success: true, message: 'Successfully created checkout session', sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
