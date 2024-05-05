import Discount from '../models/discount.model.js'

 

export const createDiscount = async (req, res, next) => {

    const { productId, discountAmount } = req.body;

    const newDiscount = new Discount({ productId, discountAmount });
    
    try {
        await newDiscount.save();
        res.status(201).json('Discount added');
    } catch (error) {
        next(error);
    }
};

export const getAllDiscounts = async (req, res) => {
    try {
      const discounts = await Discount.find();
      res.json(discounts);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  export const updateDiscount = async (req, res) => {
    const { productId } = req.params;
    const { discountAmount } = req.body;
  
    try {
      const updatedDiscount = await Discount.findOneAndUpdate(
        { productId: productId },
        { discountAmount: discountAmount },
        { new: true }
      );
  
      if (!updatedDiscount) {
        return res.status(404).json({ success: false, message: 'Discount not found' });
      }
  
      return res.status(200).json({ success: true, message: 'Discount updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


  export const deleteDiscount = async (req, res) => {
    const { productId } = req.params;
  
    try {
      // Find and delete the discount by productId
      await Discount.findOneAndDelete({ productId: productId });
  
      res.json({ success: true, message: 'Discount deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };