import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import SignInImage from '../../images/signin.jpg';
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
    <div className="bg-white flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="p-10 bg-login rounded-lg shadow-lg lg:flex w-5/5 overflow-hidden">
        {/* Left side with image */}
        <div className="lg:w-1/2 hidden lg:block">
          <img src={SignInImage} alt="Sign In" className="w-full h-2/4 object-cover" />
        </div>
        {/* Right side with form */}
        <div className="lg:w-1/2 p-5 w-5/5 h-3/5">
          <h1 className="text-3xl text-center font-semibold my-8">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-700 p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-700 p-3 rounded-lg"
              id="password"
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
              backgroundColor: 'rgba(160, 27, 6)', // Adjust the alpha value for transparency
            }}
            className={loading ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-95'} 
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Don't have an account?</p>
          <Link to={'/sign-up'}>
            <span className='text-red-800'>Sign up</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
    </div>

  );
}