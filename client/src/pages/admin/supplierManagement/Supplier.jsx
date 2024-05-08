import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; 

function Supplier() {
    const [suppliers, setSuppliers] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/api/supplier/getall');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            setError(error); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/supplier/delete/${id}`);
            fetchSuppliers();
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.Supplier_Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.address.toString().includes(searchQuery)
    );

    return (
        <div className="min-h-screen  flex items-center justify-center">
            <div className="w-3/4 bg-white rounded p-3">
                <div className="flex justify-between mb-4">
                    <Link to="/add-supplier" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">Add Supplier+</Link>
                    <div className="flex items-center"> {}
                        <FaSearch className="mr-2" /> {}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search supplier..."
                            className="border px-4 py-2"
                        />
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Supplier First Name</th>
                            <th className="px-4 py-2">Supplier Last Name</th>
                            <th className="px-4 py-2">Supplier Email</th>
                            <th className="px-4 py-2">Product NIC</th>
                            <th className="px-4 py-2">Supplier Address</th>
                            <th className="px-4 py-2">Supplier Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map((supplier) => (
                            <tr key={supplier._id}>
                                <td className="border px-4 py-2">{supplier.fname}</td>
                                <td className="border px-4 py-2">{supplier.lname}</td>
                                <td className="border px-4 py-2">{supplier.Supplier_Email}</td>
                                <td className="border px-4 py-2">{supplier.nic}</td>
                                <td className="border px-4 py-2">{supplier.address}</td>
                                <td className="border px-4 py-2">{supplier.phone}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex">
                                        <Link to={`/update-supplier/${supplier._id}`} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mr-2">Edit</Link>
                                        <button onClick={() => handleDelete(supplier._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Supplier;
