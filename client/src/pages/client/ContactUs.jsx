import { Button, Label, TextInput } from 'flowbite-react'
import { useState } from 'react'

export default function ContactUs() {

    const [formData, setFormData] = useState({});
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
        const res = await fetch('/api/contact/addContact', 
        {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if(data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
        }
        setLoading(false);
        setError(null);
        } catch (error) {
        setLoading(false);
        setError(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-200'>
        <div className='p-6 bg-white rounded-lg shadow-lg'style={{ maxWidth: '500px', width: '100%' }}> 
            <h1 className='text-3xl text-center font-semibold my-7'> Contact Us </h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
                <div>
                    <Label> Name</Label>
                    <TextInput type='text' placeholder='Name'  id='name' onChange={handleChange} style={{ height: '35px', width: '130%' }} />
                </div>
                <div>
                    <Label> Email</Label>
                    <TextInput type='text' placeholder='Email' id='email' onChange={handleChange} style={{ height: '35px', width: '130%' }} />
                </div>
                <div>
                    <Label> Contact No</Label>
                    <TextInput type='text' placeholder='ContactNo' id='contactNumber' onChange={handleChange} style={{ height: '35px', width: '130%' }} />
                </div>
                <div>
                    <Label> Message</Label>
                    <TextInput type='text' placeholder='Message' id='message' onChange={handleChange} style={{ height: '35px', width: '130%' }} />
                </div>
                <div>
                    <Button disabled={loading} gradientDuoTone='purpleToPink' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' type='submit'>
                    {
                        loading ? 'Sending...' : 'Submit'
                    }
                    </Button>
                </div>
            </form>       
            {
                error && <p className='text-red-500 mt-5'>{error}</p>
            }         
        </div>
    </div>
  )
};