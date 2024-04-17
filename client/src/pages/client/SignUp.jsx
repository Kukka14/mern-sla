import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.nic || !formData.phoneNumber || !formData.address) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className='p-6 bg-white rounded-lg shadow-lg'style={{ maxWidth: '500px', width: '100%' }}>
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
          <input
            type='text'
            placeholder='NIC'
            className='border border-gray-300 p-3 rounded-lg' id='nic'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Telephone Number'
            className='border border-gray-300 p-3 rounded-lg' id='phoneNumber'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Address'
            className='border border-gray-300 p-3 rounded-lg' id='address'
            onChange={handleChange}
          />
          {error && <p className='text-red-500'>{error}</p>}
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth/>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to={"/signin"} className='text-blue-700'>Sign In</Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  );
}
