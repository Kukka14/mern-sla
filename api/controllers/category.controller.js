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
    const categories = await Category.find({}, '_id categoryname');
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
