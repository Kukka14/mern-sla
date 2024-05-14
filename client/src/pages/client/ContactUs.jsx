import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import React from 'react';
import loginback from '../../images/contactus.png';

export default function ContactUs() {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);   //progress of form submission

    const handleChange = (e) => {                   //when change input field
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/contact/addContact',    //made post request to this endpoint with form data
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();         //process the response
            console.log(data);
            if(data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            // Display success message
            alert('Successfully submitted');
            // Refresh the page
            window.location.reload();
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    // Function to handle WhatsApp button click
    const handleWhatsAppClick = () => {
        // Replace '1234567890' with the actual WhatsApp number
        const whatsappNumber = '1234567890';
        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}`;
        // Navigate to the WhatsApp URL
        window.location.href = whatsappUrl;
    };


  return (
    <div style={{
        backgroundImage: `url(${loginback})`, // Set the background image
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat",
        height: "84.35vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div className='p-6 brounded-lg shadow-xl rounded-xl' style={{ maxWidth: '500px', width: '100%', backgroundColor: 'rgb(21,39,14, 0.1)' }}> 
            <h1 className='text-3xl text-center font-semibold my-7'> Contact Us </h1>
            <form onSubmit={handleSubmit} className='flex flex-col  gap-4'>
                <div>
                    <Label> Name</Label>
                    <TextInput type='text' placeholder='Name'  id='name' onChange={handleChange} style={{ height: '35px', width: '100%' }} />
                </div>
                <div>
                    <Label> Email</Label>
                    <TextInput type='text' placeholder='Email' id='email' onChange={handleChange} style={{ height: '35px', width: '100%' }} />
                </div>
                <div>
                    <Label> Contact No</Label>
                    <TextInput type='text' placeholder='ContactNo' id='contactNumber' onChange={handleChange} style={{ height: '35px', width: '100%' }} />
                </div>
                <div>
                    <Label> Message</Label>
                    <TextInput type='text' placeholder='Message' id='message' onChange={handleChange} style={{ height: '35px', width: '100%' }} />
                </div>
                <div>
                    <Button disabled={loading} className='bg-green-600  text-white p-3 rounded-lg uppercase hover:bg-green-700 ' type='submit'>
                    {
                        loading ? 'Sending...' : 'Submit'
                        
                    }
                    </Button>
                </div>
                <div className="text-center">
                        <button
                            type="button"
                            className="btn"
                            id="WhatsappBtn"
                            onClick={handleWhatsAppClick} // Call the handleWhatsAppClick function on button click
                        >
                            <i className="bi bi-whatsapp"></i>&nbsp;&nbsp;Contact via Whatsapp <i className="fas fa-arrow-right"></i>
                        </button>
                </div>
            </form>       
            {
                error && <p className='text-red-500 mt-5'>{error}</p>
            }         
        </div>
    </div>
  );
}
