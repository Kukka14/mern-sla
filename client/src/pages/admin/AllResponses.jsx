// AllResponses.jsx
import React from 'react';

const AllResponses = ({ allResponses }) => {
    return (
        <div>
            <h1>All Responses</h1>
            <ul>
                {allResponses.map((response, index) => (
                    <li key={index}>
                        <p>Review ID: {response.reviewId}</p>
                        <p>Response: {response.response}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllResponses;
