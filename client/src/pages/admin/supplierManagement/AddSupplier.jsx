import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateSproduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        Supplier_Email: '',
        nic: '',
        address: '',
        phone: '', 
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            // Make your HTTP POST request here
            const response = await axios.post('/api/supplier/add', formData);

            setLoading(false);

            navigate('/view-suppliers')
           

            console.log('Supplier added successfully:', response.data);
        } catch (error) {
            setError(error.message || 'An error occurred.');
            setLoading(false);
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-green-200 flex items-center justify-center">
            <div className="w-3/4 bg-white rounded p-3">
                <div className="flex justify-between mb-4">
                    <h1 className="text-3xl font-semibold">Add New Supplier</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex flex-col gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Supplier First Name"
                            className="border p-3 rounded-lg bg-gray-200"
                            id="fname"
                            minLength="2"
                            maxLength="62"
                            required
                            onChange={handleChange}
                            value={formData.fname}
                        />
                        <input
                            type="text"
                            placeholder="Supplier Last Name"
                            className="border p-3 rounded-lg bg-gray-200"
                            id="lname"
                            maxLength="62"
                            minLength="2"
                            required
                            onChange={handleChange}
                            value={formData.lname}
                        />
                        <input
                            type="email"
                            placeholder="Supplier E-mail (eg: example@example.com)"
                            className="border p-3 rounded-lg bg-gray-200"
                            id="Supplier_Email"
                            maxLength="62"
                            minLength="10"
                            required
                            onChange={handleChange}
                            value={formData.Supplier_Email}
                        />
                        <input
                            type="text"
                            placeholder="NIC"
                            className="border p-3 rounded-lg bg-gray-200"
                            id="nic"
                            minLength="10"
                            maxLength="12"
                            required
                            pattern="\d{9}[vV]|(?:\d{12})"
                            title="Please enter either 12 digits or 9 digits followed by 'v'"
                            onChange={handleChange}
                            value={formData.nic}
                        />
                        <input
                            type="text"
                            placeholder="Supplier Address"
                            className="border p-3 rounded-lg bg-gray-200"
                            id="address"
                            maxLength="225"
                            minLength="5"
                            required
                            onChange={handleChange}
                            value={formData.address}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="border p-3 rounded-lg bg-gray-200"
                            id="phone"
                            minLength="10"
                            maxLength="15"
                            required
                            onChange={handleChange}
                            value={formData.phone}
                        />
                        <button
                            type="submit"
                            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Adding Supplier...' : 'Add Supplier'}
                        </button>
                        {error && <p className='text-red-700 text-sm'>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSproduct;
