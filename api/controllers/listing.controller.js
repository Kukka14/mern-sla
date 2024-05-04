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


export const getProductById = async (req, res, next) => {
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


export const getProduct = async (req, res, next) => {
  try {
    const { productName, category } = req.query;
    const query = {};

    if (productName) {
      query.name = { $regex: productName, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const products = await Listing.find(query);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};


export const getAllListingsCount = async (req, res, next) => {
  try {
    const count = await Listing.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};


export const getAllListingsCountByCategory = async (req, res, next) => {
  try {
    const countsByCategory = await Listing.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    const countsByCategoryObject = countsByCategory.reduce((acc, categoryCount) => {
      acc[categoryCount._id] = categoryCount.count;
      return acc;
    }, {});

    res.status(200).json(countsByCategoryObject);
  } catch (error) {
    next(error);
  }
};


export const getProductByCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const products = await Listing.find({ category: categoryName });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};