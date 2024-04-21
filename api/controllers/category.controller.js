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

