import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../../images/logo2.png";
import dashboard from "./../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../firebase';

export default function AddCategory() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarUploaded, setAvatarUploaded] = useState(false); // Track whether avatar is uploaded

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setAvatarUploaded(true); // Set avatarUploaded to true when avatar is uploaded
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/category/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-sideNavBackground w-1/5 p-4">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <img src={logo} alt="Company Logo" className="w-48 h-auto" />
        </div>

        {/* Separate Line */}
        <hr className="border-gray-700 my-4" />

        {/* Navigation */}
        <div className="space-y-1">
          <NavLink
            icon={dashboard}
            text="Main Dashboard"
            to="/product-admin-dashboard"
          />
          <NavLink
            icon={dashboard}
            text="Create Listing"
            to="/product-listing"
          />
          <NavLink icon={dashboard} text="View Products" to="/product-view" />
          {/* Add more navigation items as needed */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 basis-4/5">
        {/* Header */}
        <AdminHeader />
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-semibold my-7">
            Add New Category
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Category name"
              className="border p-3 rounded-lg"
              id="categoryname"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="description"
              className="border p-3 rounded-lg"
              id="description"
              onChange={handleChange}
            />

            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            />

            {file && (
              <div>
                <p>Selected Image:</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="max-w-xs my-3"
                />
              </div>
            )}

            <button
              disabled={loading || !avatarUploaded}
              className="bg-backgreen4 text-white rounded-2xl"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>

        {/* Main Content Area */}
        <div className="p-8">{/* Your main content goes here */}</div>
      </div>
    </div>
  );
}

// NavLink Component for sidebar navigation items
function NavLink({ icon, text, to }) {
  return (
    <Link
      to={to}
      className="flex items-center text-white py-2 px-4 rounded-md  bg-sideNavButton hover:bg-sideNavButtonhover "
    >
      <img src={icon} alt={text} className="w-6 h-6 mr-4" />
      <span className="text-lg font-semibold">{text}</span>
        
    </Link>
  );
}
