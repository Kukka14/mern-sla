import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    } 
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      if (res.ok) {
        if (data.isAdmin) {
          dispatch(signInSuccess(data));
          navigate('/mainDashboard');
        } else {
          dispatch(signInSuccess(data));
          navigate('/');
        }
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div
      className="p-5 bg-white rounded-lg shadow-lg w-3/5"
      style={{ backgroundColor: "rgba(144, 162, 158, 0.8)" }}
    >
            <h1 className='text-3xl text-center font-semibold my-3'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='email'
                placeholder='email'
                className='border border-gray-700 p-3 rounded-lg'
                id='email'
                onChange={handleChange}
              />
              <input
                type='password'
                placeholder='password'
                className='border border-gray-700 p-3 rounded-lg'
                id='password'
                onChange={handleChange}
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
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </form>
            <div className='flex gap-2 mt-5'>
              <p>Don't have an account?</p>
              <Link to={'/sign-up'}>
                <span className='text-blue-700'>Sign up</span>
              </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
          </div>
        </div>
     
    
  );
}
