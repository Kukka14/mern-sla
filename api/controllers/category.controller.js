import Category from "../models/category.model.js";

export const add = async (req, res, next) => {
  const { categoryname, description, avatar } = req.body;
  const newCategory = new Category({ categoryname, description, avatar });

  try {
    await newCategory.save();
    res.status(201).json("Category created");
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryname, description, avatar } = req.body;
  
      // You might want to add some validation here
  
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { categoryname, description, avatar },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
  
      res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ success: false, message: 'Failed to update category' });
    }
  };

export const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
        next(error);
    }
  };

export const getAllCategoriesByName = async (req, res, next) => {
  try {
    const categories = await Category.find({}, '_id categoryname');
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
