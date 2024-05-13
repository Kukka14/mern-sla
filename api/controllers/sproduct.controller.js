import Sproduct from "../models/sproduct.model.js";

export const createSproduct = async (req, res, next) => {
    try {
        const { Supplier_Name, Product_Name, Product_Category, Supplier_Price, Quantity } = req.body;

        const sproduct = await Sproduct.create({
            Supplier_Name,
            Product_Name,
            Product_Category,
            Supplier_Price,
            Quantity
        });
        
        return res.status(201).json(sproduct);
    } catch (error) {
        // Handle errors
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Failed to create product." });
    }
};


export const updateSproduct = async (req, res, next) => {
    const { id } = req.params;
    const { Supplier_Name, Supplier_Email, Product_Name, Supplier_Price, Quantity } = req.body;

    try {
        // Find the product by ID and update its details
        const updatedProduct = await Sproduct.findByIdAndUpdate(
            id,
            { Supplier_Name, Supplier_Email, Product_Name, Supplier_Price, Quantity },
            { new: true } // To return the updated product
        );

        // If the product is not found, return 404
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Return the updated product
        res.status(200).json(updatedProduct);
    } catch (error) {
        // Handle errors
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product." });
    }
};


export const getAllProducts = async (req, res, next) => {
    try {
        // Query all products from the database
        const products = await Sproduct.find();

        // Return the list of products
        res.status(200).json(products);
    } catch (error) {
        // Handle errors
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Failed to retrieve products." });
    }
};

// Function to retrieve a single product by ID
export const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Query the product by ID from the database
        const product = await Sproduct.findById(id);

        // If the product is not found, return 404
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Return the product
        res.status(200).json(product);
    } catch (error) {
        // Handle errors
        console.error("Error retrieving product:", error);
        res.status(500).json({ message: "Failed to retrieve product." });
    }
};
export const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Sproduct.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product." });
    }
};


  
export const getCategoryCounts = async (req, res, next) => {
    try {
      const countsByCategory = await Sproduct.aggregate([
        {
          $group: {
            _id: "$Product_Category",
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
      console.error("Error retrieving category counts:", error);
      res.status(500).json({ message: "Failed to retrieve category counts." });
    }
  };
  
