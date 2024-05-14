import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import SignInImage from '../../images/register13.jpg';
import { app } from "../../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [addresses, setAddresses] = useState([]); // Initialize addresses as an empty array
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAddresses(); // Fetch addresses when the component mounts
  }, []);

  const fetchAddresses = () => {
    fetch(`/api/address/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUser._id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }
        return response.json();
      })
      .then((data) => {
        setAddresses(data.addresses);
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
      });
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        method: "DELETE",
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
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data)); // Navigate to sign-in page after sign-out
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${SignInImage})`, backgroundSize: "cover" }}
    >
      <div className="p-5 rounded-lg shadow-lg w-3/5" style={{ backgroundColor: 'rgba(172, 193, 172, 0.6)' }}>
        <h1 className="text-3xl font-semibold text-center my-27">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData?.avatar || currentUser.avatar}
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />

          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <div className="flex flex-row gap-4 justify-center items-center mt-9">
            <div className="flex flex-col w-1/2 justify-center items-center gap-4">
              <input
                type="text"
                placeholder="Username"
                defaultValue={currentUser.username}
                id="username"
                className="border p-3 rounded-lg w-5/6 "
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Email"
                defaultValue={currentUser.email}
                id="email"
                className="border p-3 rounded-lg w-5/6"
                onChange={handleChange}
              />

<select id="address" className="border p-3 rounded-lg w-5/6" onChange={handleChange}>
  <option value="">Select Address</option>
  {addresses && addresses.map((address) => (
    <option key={address._id} value={address._id}>
      {`${address.addressLine1}, ${address.city}, ${address.country}`}
    </option>
  ))}
</select>

            </div>
            <div className="flex flex-col w-1/2 justify-center items-center gap-4">
             
              <input
                type="tel"
                placeholder="Telephone Number"
                defaultValue={currentUser.phoneNumber}
                id="phoneNumber"
                className="border p-3 rounded-lg w-5/6"
                onChange={handleChange}
              />
{/* 
              <input
                type="text"
                placeholder="NIC"
                defaultValue={currentUser.nic}
                id="nic"
                className="border p-3 rounded-lg w-5/6"
                onChange={handleChange}
              /> */}
  <input
                type="password"
                placeholder="Password"
                id="password"
                className="border p-3 rounded-lg w-5/6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button
              disabled={loading}
              className="bg-green-900 text-white py-3 px-6 rounded-lg block w-3/5 mt-4"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <div className="flex justify-between mt-5 w-3/5">
              <span
                onClick={handleDeleteUser}
                className="text-red-700 cursor-pointer"
                style={{ color: "#ff0000" }}
              >
                Delete Account
              </span>
              <span
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer"
                style={{ color: "#ff0000" }}
              >
                Sign Out
              </span>
            </div>
          </div>
        </form>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully!" : ""}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          
         

          <Link to="/order-history">
            <button
              className="bg-carttableheader text-white py-3 px-6 rounded-full mr-4"
              style={{ color: "#ffffff" }}
            >
              Order History
            </button>
          </Link>


          <Link to="/payment-history">
            <button
              className="bg-carttableheader text-white py-3 px-6 rounded-full mr-4"
              style={{ color: "#ffffff" }}
            >
              Payment History
            </button>
          </Link>
          <Link to={`/review?userId=${currentUser._id}`} className="btn">
            <button className="bg-carttableheader text-white py-3 px-6 rounded-full mr-4" style={{ color: "#ffffff" }}>
              Add Review
            </button>
          </Link>

          <Link to={`/my-reviews/${currentUser._id}`} className="btn">
            <button className="bg-carttableheader text-white py-3 px-6 rounded-full mr-4" style={{ color: "#ffffff" }}>
              My Review
            </button>
          </Link>
        </div>




          


          


        </div>
      </div>
    

  
   

  );
}