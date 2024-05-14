import Coupon from '../models/coupon.model.js';

// Create a new coupon
export const createCoupon = async (req, res, next) => {
  try {
    const { couponCode, discountAmount, items } = req.body;
    const newCoupon = new Coupon({ couponCode, discountAmount, items });
    await newCoupon.save();
    res.status(201).json({ success: true, message: 'Coupon created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCouponStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, coupon: updatedCoupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a coupon by ID
export const updateCouponById = async (req, res) => {
  try {
    const { couponCode, items } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, { couponCode, items }, { new: true });
    res.json(updatedCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCouponById = async (req, res) => {
  

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!deletedCoupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllCouponCount = async (req, res, next) => {
  try {
    const count = await Coupon.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};