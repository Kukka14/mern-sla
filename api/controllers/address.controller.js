import Address from '../models/address.model.js';

export const getAddresses = async (req, res) => {
    const { userId } = req.body; 
    try {
      
        const address = await Address.findOne({ userId });

        if (!address) {
          
            return res.json({ message: 'No address found' });
        } else {
         
            return res.json({ address, message: 'Address fetched successfully' });
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        
        return res.status(500).json({ error: 'An error occurred while fetching address' });
    }
};
export const createAddress = async (req, res) => {
    const { userId, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
    try {
        const addressData = { userId, addressLine1, addressLine2, city, state, postalCode, country };
        const address = await Address.create(addressData);
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
