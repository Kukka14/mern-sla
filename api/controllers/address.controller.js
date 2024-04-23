import Address from '../models/address.model.js';

export const getAddresses = async (req, res) => {
    const { userId } = req.body; 
    try {
        // Find all addresses associated with the user
        const addresses = await Address.find({ userId: userId });

        if (!addresses || addresses.length === 0) {
            return res.json({ message: 'No addresses found' });
        } else {
            return res.json({ addresses, message: 'Addresses fetched successfully' });
        }
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return res.status(500).json({ error: 'An error occurred while fetching addresses' });
    }
};

export const createAddress = async (req, res) => {
    try {
        const { userId, addressLine1, city, state, postalCode, country } = req.body;

       

        
        const addressData = { userId, addressLine1, city, state, postalCode, country };
        const address = await Address.create(addressData);

        // Return success response
        res.status(201).json({ message: 'Address created successfully', address });
    } catch (error) {
        console.error('Error creating address:', error);
        res.status(500).json({ error: 'An error occurred while creating address' });
    }
};
    export const updateAddress = async (req, res) => {
        const addressId = req.params.addressId;
        const addressData = req.body;
        try {
            const updatedAddress = await Address.findByIdAndUpdate(addressId, addressData, { new: true });
            if (!updatedAddress) {
                return res.status(404).json({ error: 'Address not found' });
            }
            res.json({ address: updatedAddress });
        } catch (error) {
            console.error('Error updating address:', error);
            res.status(500).json({ error: 'An error occurred while updating address' });
        }
    };
export const deleteAddress = async (req, res) => {
    const addressId = req.params.addressId;
    try {
        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ error: 'An error occurred while deleting address' });
    }
};

export const getAddressById = async (req, res) => {
    const addressId = req.params;
    try {
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.json({ address });
    } catch (error) {
        console.error('Error fetching address:', error);
        res.status(500).json({ error: 'An error occurred while fetching address' });
    }
};