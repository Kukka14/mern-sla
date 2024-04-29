import Supplier from "../models/supplier.model.js";

export const Createsupplier = async (req, res, next) => {
    try {
        const { fname,lname, Supplier_Email, nic, address, phone } = req.body;

        const supplier = await Supplier.create({
            fname,
            lname,
            Supplier_Email, 
            nic, 
            address, 
            phone
        });
        
        return res.status(201).json(supplier);
    } catch (error) {
        // Handle errors
        console.error("Error creating supplier:", error);
        return res.status(500).json({ message: "Failed to create supplier." });
    }
};


export const updateSupplier = async (req, res, next) => {
    const { id } = req.params;
    const { fname,lname, Supplier_Email, nic, address, phone } = req.body;

    try {
        // Find the supplier by ID and update its details
        const updatedSupplier = await Sproduct.findByIdAndUpdate(
            id,
            { Supplier_Name, Supplier_Email, Product_Name, Supplier_Price, Quantity },
            { new: true } // To return the updated product
        );

        // If the supplier is not found, return 404
        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        // Return the updated supplier
        res.status(200).json(updatedSupplier);
    } catch (error) {
        // Handle errors
        console.error("Error updating supplier:", error);
        res.status(500).json({ message: "Failed to update supplier." });
    }
};


export const getAllSuppliers = async (req, res, next) => {
    try {
        // Query all supplier from the database
        const supplier = await Supplier.find();

        // Return the list of suppliers
        res.status(200).json(supplier);
    } catch (error) {
        // Handle errors
        console.error("Error retrieving suppliers:", error);
        res.status(500).json({ message: "Failed to retrieve suppliers." });
    }
};

// Function to retrieve a single supplier by ID
export const getSupplierById = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Query the supplier by ID from the database
        const supplier = await Supplier.findById(id);

        // If the supplier is not found, return 404
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        // Return the supplier
        res.status(200).json(supplier);
    } catch (error) {
        // Handle errors
        console.error("Error retrieving supplier:", error);
        res.status(500).json({ message: "Failed to retrieve supplier." });
    }
};
export const deleteSupplierById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Suppleir not found." });
        }
        res.status(200).json({ message: "Supplier deleted successfully." });
    } catch (error) {
        console.error("Error deleting supplier:", error);
        res.status(500).json({ message: "Failed to delete supplier." });
    }
};
