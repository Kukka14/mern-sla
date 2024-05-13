import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from "../../../images/logo2.png";
import dashboard from "../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";

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
        // Prevent typing special characters and spaces in the username and address fields
        if (e.target.id === 'fname' || e.target.id === 'lname' || e.target.id === 'address') {
            const value = e.target.value.replace(/[!@#\$%\^&\*\(\)\<\>\[\]\{\};:'"|,\.\? ]/gi, '');
            setFormData({
                ...formData,
                [e.target.id]: value,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
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
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-sideNavBackground w-1/5 p-4">
                {/* Logo */}
                <div className="flex justify-center items-center mb-8">
                    <img src={logo} alt="Company Logo" className="w-48 h-auto" />
                </div>
    
                {/* Separate Line */}
                <hr className="border-gray-700 my-4" />
    
                {/* Navigation */}
                    
                <div className="space-y-1">
                    <NavLink icon={dashboard} text="Main Dashboard" to="/sdashboard" />
                    <NavLink icon={dashboard} text="Add Supplier" to="/add-supplier" />
                    <NavLink icon={dashboard} text="View Suppliers" to="/view-suppliers" />
                    <NavLink icon={dashboard} text="Add Product" to="/create-sproduct" />
                    <NavLink icon={dashboard} text="View Products" to="/sproduct" />
                    <NavLink icon={dashboard} text="Generate Reports" to="/sproductreport" />
                    {/* Add more navigation items as needed */}
                </div>
            </div>
    
            <div className="basis-4/5 ">
                <AdminHeader />
    
                <div className="min-h-screen flex items-center justify-center">
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
                                    pattern="[A-Za-z]*"
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
                                    pattern="[A-Za-z]*"
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
                                    minLength="4"
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
                                    className="bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-blue-600 w-full"
                                    disabled={loading}
                                >
                                    {loading ? 'Adding Supplier...' : 'Add Supplier'}
                                </button>
                                {error && <p className='text-red-700 text-sm'>{error}</p>}
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

function NavLink({ icon, text, to }) {
    return (
        <Link
            to={to}
            className="flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover "
        >
            <img src={icon} alt={text} className="w-6 h-6 mr-4" />
            <span className="text-lg font-semibold">{text}</span>
        </Link>
    );
}

export default CreateSproduct;
