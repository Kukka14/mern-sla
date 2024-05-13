import Payment from "../models/payment.model.js";
import stripe from 'stripe';
import Order from '../models/order.model.js';

const User = require('../models/user.model');

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

