import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/product/product-list')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <li key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <Link to={`/pdetails/${product._id}`}>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">Description: {product.description}</p>
            <p className="text-green-600 font-semibold">Price: ${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
