import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


export const contactus = async (req, res, next) => {
    const { name, email, contactNo, message } = req.body;

    if (!name || !email || !contactNo || !message || name === '' || email === '' || contactNo === '' || message === '') {
        next(errorHandler(400, 'All fields are required'));  
    }

    const newUser = new User ({
        name,
        email,
        contactNo,
        message,
    });

    try {
        await newUser.save();
        res.json( 'Inquiary successful' );
    }catch (error) {
        next(error);
    }
    
};