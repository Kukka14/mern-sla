import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Define the loading state
  const [error, setError] = useState('');
  const navigate =useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success===false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading (false);
      setError(null);
      navigate('/SignIn');
      console.log(data);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  }; 

  console.log(formData);

  return (
    <div>
      <div className='p-3 max-w-lg mx-auto'>  
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
          <input
            type='text'
            placeholder='Username'
            className='border border-gray-300 p-3 rounded-lg' id='username'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            className='border p-3 border-gray-300 rounded-lg' id='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='border border-gray-300 p-3 rounded-lg' id='password'
            onChange={handleChange}
          />
          
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
         
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to={"/SignIn"} className='text-blue-700'>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
