import React, { useState } from 'react';

export default function CreateListing() {
    const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    address: '',
    nic: '',
    phone: '',
    email: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const res= await fetch('/api/listing/create',
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

            const data = await res.json();
            console.log('Response data:', data);
            
            setLoading(false);
            if (!res.ok) {
                // Handle non-successful response (e.g., status code 4xx or 5xx)
                setError(data.message || 'An error occurred.');
                return;
            }
            if (data.success === false) {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
            console.error('Error:', error); // Log any errors that occur during the request
            
        }
    };

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Add New Supplier</h1>
            <h1 className='text-xl my-7'>Supplier Details</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder='First Name'
                        className='border p-3 rounded-lg bg-gray-200'
                        id='fname'
                        maxLength='62'
                        minLength='2'
                        required
                        onChange={handleChange}
                        value={formData.fname}
                    />

                    <input
                        type="text"
                        placeholder='Last Name'
                        className='border p-3 rounded-lg bg-gray-200'
                        id='lname'
                        maxLength='62'
                        minLength='2'
                        required
                        onChange={handleChange}
                        value={formData.lname}
                    />

                    <input
                        type="text"
                        placeholder='Address'
                        className='border p-3 rounded-lg bg-gray-200'
                        id='address'
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />

                    <input
                        type="text"
                        placeholder='NIC'
                        className='border p-3 rounded-lg bg-gray-200'
                        id='nic'
                        maxLength='12'
                        minLength='12'
                        required
                        inputMode='numeric'
                        pattern="[0-9]*"
                        title="Please enter only numbers"
                        onChange={handleChange}
                        value={formData.nic}
                    />

                    <input
                        type="text"
                        placeholder='Phone'
                        className='border p-3 rounded-lg bg-gray-200'
                        id='phone'
                        maxLength='10'
                        minLength='10'
                        required
                        inputMode='numeric'
                        pattern="[0-9]*"
                        title="Please enter only numbers"
                        onChange={handleChange}
                        value={formData.phone}
                    />

                    <input
                        type="email" // Use email type
                        placeholder='E-mail(eg: example@example.com)'
                        className='border p-3 rounded-lg bg-gray-200'
                        id='email'
                        maxLength='62'
                        minLength='10'
                        required
                        onChange={handleChange}
                        value={formData.email}
                    />

                    <button disabled={loading}
                        className='p-3 bg-green-900 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-40'>
                        {
                            loading ? 'Creating...' : 'Create Supplier'
                        }
                    </button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>
            </form>
        </main>
    )
}

