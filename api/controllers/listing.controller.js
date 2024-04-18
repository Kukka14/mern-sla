import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {

    const{fname,lname,address,nic,phone,email}=req.body;
    //const newSupplier= new Supplier({fname,lname,address,nic,phone,email});

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};