import Contact from "../models/contact.model.js";

export const add = async (req, res, next) => {

    const { name, email, contactNumber, message } = req.body;
    const newContact = new Contact({name, email, contactNumber, message});
    
    try {
        await newContact.save();
        res.status(201).json('Inquiry success');
    } catch (error) {
        next(error);
    }
};