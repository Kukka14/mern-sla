import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function Dashboard() {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchSuppliers();
        fetchProducts();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/api/supplier/getall');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product/getall');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDeleteSupplier = async (id) => {
        try {
            await axios.delete(`/api/supplier/delete/${id}`);
            fetchSuppliers();
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`/api/product/delete/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toString().includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-green-100 flex">
            {/* Sidebar */}
            <div className="bg-green-700 text-white p-4 flex flex-col">
                <Link to="/add-supplier" className="my-2">Add Supplier</Link>
                <Link to="/view-suppliers" className="my-2">View Suppliers</Link>
                <Link to="/Create-Sproduct" className="my-2">Add Product</Link>
                <Link to="/Sproduct" className="my-2">View Products</Link>
                <Link to="/SproductReport" className="my-2">Generate Reports</Link>
                <div className="mt-auto">
                    <p>Total Suppliers: {suppliers.length}</p>
                    <p>Total Products: {products.length}</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-grow p-4">
                <div className="bg-white rounded p-3">
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                            <FaSearch className="mr-2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="border px-4 py-2"
                            />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold mb-4">Suppliers</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.map((supplier) => (
                                <tr key={supplier._id}>
                                    <td className="border px-4 py-2">{supplier.name}</td>
                                    <td className="border px-4 py-2">{supplier.email}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleDeleteSupplier(supplier._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="text-xl font-bold mb-4">Products</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td className="border px-4 py-2">{product.name}</td>
                                    <td className="border px-4 py-2">{product.price}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
