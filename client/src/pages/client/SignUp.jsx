import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginback from '../../images/register13.jpg'; 

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Prevent typing special characters and spaces in the username and address fields
    if (e.target.id === 'username') {
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

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.nic || !formData.phoneNumber ) {
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
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${loginback})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "84.35vh"
    }}>
      <div className="flex justify-center min-h-screen">
        <div className="lg:w-full p-5 rounded-lg shadow-lg bg-transparent">
          <h1 className='text-3xl text-center font-semibold mt-11 mb-9 text-white'>Sign Up</h1>
          {errorMessage.general && <p className='text-red-500'>{errorMessage.general}</p>}
          <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
            <input
              type='text'
              placeholder='Username'
              className='border border-gray-700 p-3 rounded-lg w-1/3 h-full'
              id='username'
              style={{ color: '#fff', backgroundColor: 'rgb(255, 255, 255, 0.3)' }}
              value={formData.username || ''}
              onChange={handleChange}
            />
            {errorMessage.username && <p className='text-red-500'>{errorMessage.username}</p>}
            <input
              type='email'
              placeholder='Email'
              className='border p-3 border-gray-700 rounded-lg w-1/3 h-full'
              id='email'
              style={{ color: '#fff', backgroundColor: 'rgb(255, 255, 255, 0.3)' }}
              onChange={handleChange}
            />
            {errorMessage.password && <p className='text-red-500'>{errorMessage.password}</p>}
            <input
              type='password'
              placeholder='Password'
              className='border p-3  border-gray-700 rounded-lg w-1/3 h-full'
              id='password'
              style={{  color: '#fff', backgroundColor: 'rgb(255, 255, 255, 0.3)' }}
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              className='border border-gray-700 p-3 rounded-lg w-1/3 h-full'
              id='confirmPassword'
              style={{  color: '#fff', backgroundColor: 'rgb(255, 255, 255, 0.3)' }}
              onChange={handleChange}
            />

{errorMessage.nic && <p className='text-red-500'>{errorMessage.nic}</p>}
          <input
            type='text'
            placeholder='NIC'
            className='border border-gray-700 p-3 rounded-lg w-1/3 h-full' // Increased width
            id='nic'
            style={{  color: '#fff', backgroundColor: 'rgb(255, 255, 255, 0.3)' }}
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
              className='border border-gray-700 p-3 rounded-lg w-1/3 h-full'
              id='phoneNumber'
              style={{  color: '#fff', backgroundColor: 'rgb(255, 255, 255, 0.3)' }}
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
                padding: '.5rem 2rem',
                borderRadius: '0.5rem',
                marginBottom: '8rem',
                marginTop: '1rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'rgba( 11, 128, 24)',
              }}
              className={loading ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-95'}
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
