import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, 'username email'); // Only fetch username and email
    res.status(200).json(users);
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

export const updateUserByAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, nic, phoneNumber, address } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { username, email, nic, phoneNumber, address },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};

export const deleteUserByAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(errorHandler(500, 'Internal Server Error'));
  }
};
