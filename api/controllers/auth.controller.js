import User from "../models/user.model.js";

export const contactus = async (req, res) => {
    const { name, email, contactNo, message } = req.body;

    if (!name || !email || !contactNo || !message || name === '' || email === '' || contactNo === '' || message === '') {
        return res.status(400).json({ message: 'All fields are required' });
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
        res.status(500).json({message: error.message});
    }
    
};