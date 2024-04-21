import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../../images/logo2.png";
import dashboard from "./../../../images/icons8-arrow-50 (1).png";
import { FaSortAmountDown } from "react-icons/fa";
import AdminHeader from "../../../components/AdminHeader";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";

export default function AddCategory() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const navigate = useNavigate();

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
      
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      navigate('/viewCategories');
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
          <NavLink icon={dashboard} text="Add Categories" to="/addCatecory" />
          <NavLink icon={dashboard} text="View Categories" to="/viewCategories" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 basis-4/5">
        {/* Header */}
        <AdminHeader />
        <div className="p-3 max-w-lg mx-auto mt-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-sideNavText text-lg">Category Name :</label>
            <input
              type="text"
              placeholder="Category name"
              className="border p-3 rounded-lg bg-sideNavBackground"
              id="categoryname"
              onChange={handleChange}
            />
            <label className="text-sideNavText text-lg">Description :</label>
            <input
              type="text"
              placeholder="description"
              className="border p-3 rounded-lg bg-sideNavBackground"
              id="description"
              onChange={handleChange}
            />

            <div className="flex justify-center items-center">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
                className=""
              />
            </div>

            {file && (
              <div>
                <p>Selected Image:</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="max-w-xs my-3 w-36 h-36"
                />
              </div>
            )}

            <button
              disabled={loading || !avatarUploaded}
              className="bg-backgreen4 text-white rounded-2xl h-12 font-semibold text-xl"
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
