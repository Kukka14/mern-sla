import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        Supplier_Email: '',
        nic: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`/api/supplier/getdetails/${id}`);
                const { fname, lname, Supplier_Email, nic, address,phone } = response.data;
                setFormData({ fname, lname, Supplier_Email, nic, address,phone });
            } catch (error) {
                console.error('Error fetching supplier:', error);
            }
        };

        fetchSupplier();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/supplier/update/${id}`, formData);
            // Redirect to the supplier list after successful update
            navigate('/view-suppliers');
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-3/4 bg-white rounded p-3">
                <div className="flex justify-between mb-4">
                    <h1 className="text-3xl font-semibold">Update Supplier</h1>
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
                            maxLength="10"
                            required
                            onChange={handleChange}
                            value={formData.phone}
                        />


                        <button
                            type="submit"
                            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                        >
                            Update Supplier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UpdateSupplier;
