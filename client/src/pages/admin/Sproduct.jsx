import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Importing search icon from react-icons/fa

function Sproduct() {
    const [products, setProducts] = useState([]); // Initialize products as an empty array
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error status

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/sproduct/getall');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error); // Set error state if there's an error fetching products
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/sproduct/delete/${id}`);
            // Refresh the product list after deletion
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Conditional rendering based on loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredProducts = products.filter(product =>
        product.Supplier_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Supplier_Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Product_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Supplier_Price.toString().includes(searchQuery)
    );

    return (
        <div className="min-h-screen  flex items-center justify-center">
            <div className="w-3/4 bg-white rounded p-3">
                <div className="flex justify-between mb-4">
                    <Link to="/create-sproduct" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">Add Products+</Link>
                    <div className="flex items-center"> {/* Wrapping the search icon and input in a div */}
                        <FaSearch className="mr-2" /> {/* Search icon */}
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
                            <th className="px-4 py-2">Supplier Name</th>
                            <th className="px-4 py-2">Supplier Email</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Supplier Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td className="border px-4 py-2">{product.Supplier_Name}</td>
                                <td className="border px-4 py-2">{product.Supplier_Email}</td>
                                <td className="border px-4 py-2">{product.Product_Name}</td>
                                <td className="border px-4 py-2">{product.Supplier_Price}</td>
                                <td className="border px-4 py-2">{product.Quantity}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex">
                                        <Link to={`/update-sproduct/${product._id}`} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mr-2">Edit</Link>
                                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
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

export default Sproduct;
