import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
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
      <div className="p-5 bg-white rounded-lg shadow-lg" style={{ maxWidth: '500px', width: '500%', backgroundColor: 'rgba(144, 162, 158, 0.8)' }}>
        <h1 className='text-3xl text-center font-semibold my-3 '>Sign Up</h1>
        {errorMessage.general && <p className='text-red-500'>{errorMessage.general}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
          <input
            type='text'
            placeholder='Username'
            className='border border-gray-700 p-3 rounded-lg'
            id='username'
            onChange={handleChange}
          />
          {errorMessage.email && <p className='text-red-500'>{errorMessage.email}</p>}
          <input
            type='email'
            placeholder='Email'
            className='border p-3 border-gray-700 rounded-lg'
            id='email'
            onChange={handleChange}
          />
          {errorMessage.password && <p className='text-red-500'>{errorMessage.password}</p>}
          <input
            type='password'
            placeholder='Password'
            className='border border-gray-700 p-3 rounded-lg'
            id='password'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            className='border border-gray-700 p-3 rounded-lg'
            id='confirmPassword'
            onChange={handleChange}
          />
          {errorMessage.nic && <p className='text-red-500'>{errorMessage.nic}</p>}
          <input
            type='text'
            placeholder='NIC'
            className='border border-gray-700 p-3 rounded-lg'
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
            className='border border-gray-700 p-3 rounded-lg'
            id='phoneNumber'
            pattern='\d{10}'
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/, '').slice(0, 10);
            }}
          />
          <input
            type='text'
            placeholder='Address'
            className='border border-gray-700 p-3 rounded-lg'
            id='address'
            onChange={handleChange}
          />
          <button disabled={loading} className='bg-green-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
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
