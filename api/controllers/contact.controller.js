import Contact from "../models/contact.model.js";

export const add = async (req, res, next) => {   //function to pass control to next middleware

    const { name, email, contactNumber, message } = req.body;   //extract data from req body
    const newContact = new Contact({name, email, contactNumber, message});     //create new contact

    try {
        await newContact.save();
        res.status(201).json('Inquiry success');
    } catch (error) {
        next(error);
    }
};



/*In summary, this code is a controller
 function that handles the addition of a new contact to the database.*/