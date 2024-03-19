// Import necessary modules

import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};

export const test =  (req, res) => {
  res.json({
    message:'hellow  route is working '
  });
  
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    console.log(id);
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'An error occurred while fetching product' });
  }
};


