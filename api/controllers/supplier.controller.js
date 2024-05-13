import Supplier from "../models/supplier.model.js";

export const addSupplier = async (req, res) => {
    try {
        const { fname, lname, Supplier_Email, nic, address,phone } = req.body;

        // Create a new supplier instance
        const newSupplier = new Supplier({
            fname,
            lname,
            Supplier_Email,
            nic,
            address,
            phone
        });

        // Save the new supplier to the database
        const savedSupplier = await newSupplier.save();

        res.status(201).json(savedSupplier);
    } catch (error) {
        console.error("Error adding supplier:", error);
        res.status(500).json({ message: "Failed to add supplier." });
    }
};

export const updateSupplier = async (req, res, next) => {
    const { id } = req.params;
    const { fname,lname, Supplier_Email, nic, address, phone } = req.body;

    try {
        // Find the supplier by ID and update its details
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            {fname,lname, Supplier_Email, nic, address, phone },
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        res.status(200).json(updatedSupplier);
    } catch (error) {
        console.error("Error updating supplier:", error);
        res.status(500).json({ message: "Failed to update supplier." });
    }
};


export const getAllSuppliers = async (req, res, next) => {
    try {
        const supplier = await Supplier.find();

        res.status(200).json(supplier);
    } catch (error) {
        console.error("Error retrieving suppliers:", error);
        res.status(500).json({ message: "Failed to retrieve suppliers." });
    }
};

// Function to retrieve a single supplier by ID
export const getSupplierById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found." });
        }

        res.status(200).json(supplier);
    } catch (error) {
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


export const getAllSupplierNames = async (req, res, next) => {
    try {
        // Fetch all suppliers and project only the 'fname' field
        const suppliers = await Supplier.find({}, 'fname');

        // Extract supplier names
        const supplierNames = suppliers.map(supplier => supplier.fname);

        res.status(200).json(supplierNames);
    } catch (error) {
        console.error("Error retrieving supplier names:", error);
        res.status(500).json({ message: "Failed to retrieve supplier names." });
    }
};
