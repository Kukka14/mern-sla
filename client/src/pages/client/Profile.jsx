import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart
 
} from '../../redux/user/userSlice';

import { useDispatch } from 'react-redux';



export default function Profile() {

  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL}));
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data)); // Navigate to sign-in page after sign-out
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  
  return (
   

    <div className="flex items-center justify-center min-h-screen">
   
       
    <div className="p-5 bg-white rounded-lg shadow-lg" style={{ maxWidth: '500px', width: '500%', backgroundColor: 'rgba(144, 162, 158, 0.8)' }}>
    <h1 className='text-3xl font-semibold text-center my-27'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
          <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
          <img onClick={() => fileRef.current.click()} src={formData?.avatar || currentUser.avatar} alt='Profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
          
          <p className='text-sm self-center'>
            {fileUploadError ? (
              <span className='text-red-700'>Error Image upload (image must be less than 2 mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : ('')
            }
          </p>
          <input
            type="text"
            placeholder='Username'
            defaultValue={currentUser.username}
            id='username'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder='Email'
            defaultValue={currentUser.email}
            id='email'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder='Address'
            defaultValue={currentUser.address}
            id='address'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />

          <input
            type="tel"
            placeholder='Telephone Number'
            defaultValue={currentUser.phoneNumber}
            id='phoneNumber'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder='NIC'
            defaultValue={currentUser.nic}
            id='nic'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder='Password'
            id='password'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />

          {/* You can add more input fields for additional details if needed */}

          <button
            disabled={loading}
            className='bg-green-900 text-white py-3 px-6 rounded-lg block w-full mt-4'
            
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
        {/* Delete account and sign out buttons */}
        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer' style={{ color: '#ff0000' }}>Delete Account</span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer' style={{ color: '#ff0000' }}>Sign Out</span>
        </div>
        {/* Error and success messages */}
        <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
  <button className='bg-blue-900 text-white py-3 px-6 rounded-full mr-4' style={{ color: '#ffffff' }}>Order</button>
  <button className='bg-blue-900 text-white py-3 px-6 rounded-full mr-4' style={{ color: '#ffffff' }}>Payments</button>
  <button className='bg-blue-900 text-white py-3 px-6 rounded-full' style={{ color: '#ffffff' }}>Address</button>
</div>






      </div>
      </div>
    
   
  );
}
