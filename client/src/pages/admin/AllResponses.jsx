// AllResponses.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllResponses = () => {
    const [allResponses, setAllResponses] = useState([]);

    useEffect(() => {
        fetchAllResponses();
    }, []);

    const fetchAllResponses = async () => {
        try {
            const response = await axios.get('/api/all-responses');
            setAllResponses(response.data);
        } catch (error) {
            console.error('Error fetching all responses:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">All Responses</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Comment</th>
                            <th className="px-4 py-2">Admin Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allResponses.map((response) => (
                            <tr key={response._id}>
                                <td className="border px-4 py-2">{response.comment}</td>
                                <td className="border px-4 py-2">{response.adminResponse}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllResponses;
