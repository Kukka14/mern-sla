import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaUserPlus, FaList, FaPlusSquare, FaChartBar } from 'react-icons/fa';

function Dashboard() {
    const [totalSuppliers, setTotalSuppliers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTotalProducts();
    }, []);

    const fetchTotalProducts = async () => {
        try {
            const response = await axios.get('/api/sproduct/getcount');
            setTotalProducts(response.data.count);
        } catch (error) {
            console.error('Error fetching total products:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="min-h-screen bg-green-100 flex">
            {/* Sidebar */}
            <div className="bg-green-700 text-white p-4 flex flex-col">
                <Link to="/add-supplier" className="my-2 flex items-center">
                    <FaUserPlus className="mr-2" />
                    Add Supplier
                </Link>
                <Link to="/view-suppliers" className="my-2 flex items-center">
                    <FaList className="mr-2" />
                    View Suppliers
                </Link>
                <Link to="/create-sproduct" className="my-2 flex items-center">
                    <FaPlusSquare className="mr-2" />
                    Add Product
                </Link>
                <Link to="/sproduct" className="my-2 flex items-center">
                    <FaList className="mr-2" />
                    View Products
                </Link>
                <Link to="/sproductreport" className="my-2 flex items-center">
                    <FaChartBar className="mr-2" />
                    Generate Reports
                </Link>
                <div className="mt-auto">
                    <p>Total Suppliers: {totalSuppliers}</p>
                    <p>Total Products: {totalProducts}</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-grow p-4">
                <div className="bg-white rounded p-3">
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="bg-gray-200 rounded p-4 w-full mr-4">
                            <h2 className="text-lg font-bold">Total Suppliers</h2>
                            <p className="text-4xl font-bold">{totalSuppliers}</p>
                        </div>
                        <div className="bg-gray-200 rounded p-4 w-full">
                            <h2 className="text-lg font-bold">Total Products</h2>
                            <p className="text-4xl font-bold">{totalProducts}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
