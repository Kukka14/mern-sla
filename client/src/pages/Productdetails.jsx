import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Productdetails() {
    const { productId } = useParams(); // Get the product ID from the URL params
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Default quantity is 1

    useEffect(() => {
        // Fetch product data from backend API based on productId
        fetch(`/api/product/pdetails/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [productId]);

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const addToCart = async () => {
        try {
            const response = await fetch('/api/cart/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity, price: product.price, product: product.name }),
            });
            if (response.ok) {
                console.log('Product added to cart');
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div className="product-details p-4">
            {product ? (
                <>
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <p className="mb-2">Description: {product.description}</p>
                    <p className="mb-2">Price: ${product.price}</p>
                    <div className="mb-4">
                        <label className="block text-gray-700">Quantity:</label>
                        <select className="mt-1 block w-full p-2 border rounded-md" value={quantity} onChange={handleQuantityChange}>
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addToCart}>Add to Cart</button>
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}
