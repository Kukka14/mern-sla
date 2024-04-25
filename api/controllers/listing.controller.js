import Listing from '../models/listing.model.js'

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};  

export const getAllProduct = async (req, res, next) => {
  try {
      const listing = await Listing.find();
      res.status(200).json(listing);
  } catch (error) {
      next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  try {
    const updatedProduct = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};


export const getProductById = async (req, res) => {
  try {
    const category = await Listing.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
      next(error);
    }
  };

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
      await Listing.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      next(error);
  }
};