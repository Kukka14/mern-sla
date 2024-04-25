import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadeTask = uploadBytesResumable(storageRef, file);
    
    uploadeTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadeTask.snapshot.ref).then
        ((downloadURL) => setFormData({ ...formData, avatar: downloadURL}));
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
    <div className='p-3 max-w-lg mx-auto bg-green-100 rounded-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className = 'flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type = "file" ref = {fileRef} hidden accept = 'image/*'/>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={() => fileRef.current.click()} 
        src={formData?.avatar || currentUser.avatar} alt='Profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          placeholder='Username'
          defaultValue={currentUser.username}
          id = 'username'
          className='border p-3 rounded-lg '
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder='Email'
          defaultValue={currentUser.email}
          id = 'email'
          className='border p-3 rounded-lg '
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder='Address'
          defaultValue={currentUser.address}
          id = 'address'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type="tel"
          placeholder='Telephone Number'
          defaultValue={currentUser.phoneNumber}
          id = 'phoneNumber'
          className='border p-3 rounded-lg '
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder='NIC'
          defaultValue={currentUser.nic}
          id ='nic'
          className='border p-3 rounded-lg '
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder='Password'
          
          id = 'password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        {/* You can add more input fields for additional details if needed */}

        <button
        
          disabled={loading}
          className='bg-green-500 text-white py-3 px-6 rounded-lg block w-full mt-4'
        >
           {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className = "flex justify-between mt-5">
      <span onClick={handleDeleteUser} className = 'text-red-700 cursor-pointer'> Delete Account</span>
     
      
      

      <Link to={`/my-reviews/${currentUser._id}`} className="btn">My Review</Link>

    
    <Link to={`/review?userId=${currentUser._id}`} className="btn">Add Review</Link>


      
      <span onClick={handleSignOut} className = 'text-red-700 cursor-pointer'> Sign Out</span>
    </div>

    <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>

    </div>
  );
}

