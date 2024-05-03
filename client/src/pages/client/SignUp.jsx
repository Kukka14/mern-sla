import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Prevent typing special characters and spaces in the username and address fields
    if (e.target.id === 'username' || e.target.id === 'address') {
      const value = e.target.value.replace(/[!@#\$%\^&\*\(\)\<\>\[\]\{\};:'"|,\.\? ]/gi, '');
      setFormData({
        ...formData,
        [e.target.id]: value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    
    setErrorMessage({
      ...errorMessage,
      [e.target.id]: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.nic || !formData.phoneNumber || !formData.address) {
      errors.general = 'Please fill out all fields.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // NIC validation
    const nicRegex = /^(\d{9}(?:[vV]|\d{3})|\d{12})$/;
    if (!nicRegex.test(formData.nic)) {
      errors.nic = 'Please enter a valid NIC (e.g., 123456789V or 123456789012).';
    }

    // Phone number validation
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number.';
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      errors.password = 'Passwords do not match.';
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }

    // Username and address validation (disallowing special characters and spaces)
    const usernameAndAddressRegex = /^[^\s!@#\$%\^&\*\(\)\<\>\[\]\{\};:'"|,\.\?]+$/;
    if (!usernameAndAddressRegex.test(formData.username)) {
      errors.username = 'Username cannot contain special characters or spaces.';
    }
    if (!usernameAndAddressRegex.test(formData.address)) {
      errors.address = 'Address cannot contain special characters or spaces.';
    }

    if (Object.keys(errors).length > 0) {
      return setErrorMessage(errors);
    }

    try {
      setLoading(true);
      setErrorMessage({});
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage({ general: data.message });
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage({ general: error.message });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="p-5 bg-white rounded-lg shadow-lg w-3/5" // Increased width of the form container
        style={{ backgroundColor: "rgba(144, 162, 158, 0.8)" }}
      >
        <h1 className='text-3xl text-center font-semibold my-3 '>Sign Up</h1>
        {errorMessage.general && <p className='text-red-500'>{errorMessage.general}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
          <input
            type='text'
            placeholder='Username'
            className='border border-gray-700 p-3 rounded-lg w-full' // Increased width
            id='username'
            value={formData.username || ''}
            onChange={handleChange}
          />
          {errorMessage.username && <p className='text-red-500'>{errorMessage.username}</p>}
          <input
            type='email'
            placeholder='Email'
            className='border p-3 border-gray-700 rounded-lg w-full' // Increased width
            id='email'
            onChange={handleChange}
          />
          {errorMessage.password && <p className='text-red-500'>{errorMessage.password}</p>}
          <input
            type='password'
            placeholder='Password'
            className='border border-gray-700 p-3 rounded-lg w-full' // Increased width
            id='password'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            className='border border-gray-700 p-3 rounded-lg w-full' // Increased width
            id='confirmPassword'
            onChange={handleChange}
          />
          {errorMessage.nic && <p className='text-red-500'>{errorMessage.nic}</p>}
          <input
            type='text'
            placeholder='NIC'
            className='border border-gray-700 p-3 rounded-lg w-full' // Increased width
            id='nic'
            pattern='\d{9}[vV]|\d{12}'
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9vV]/, '').slice(0, 12);
            }}
          />
          {errorMessage.phoneNumber && <p className='text-red-500'>{errorMessage.phoneNumber}</p>}
          <input
            type='text'
            placeholder='Telephone Number'
            className='border border-gray-700 p-3 rounded-lg w-full' // Increased width
            id='phoneNumber'
            pattern='\d{10}'
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/, '').slice(0, 10);
            }}
          />
       
          <button
            disabled={loading}
            style={{
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'rgba(0, 128, 0, 0.8)', // Adjust the alpha value for transparency
            }}
            className={loading ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-95'}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to='/sign-in' className='text-blue-700'>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
