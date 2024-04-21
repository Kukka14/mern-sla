import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../../images/logo2.png";
import dashboard from "./../../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../../components/AdminHeader";
import { useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'; // Assuming these are defined in your user actions file
import { app } from "../../../firebase";

export default function UpdateCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/category/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch category");
        }
        setCategory(data);
        setFormData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to fetch category");
        setLoading(false);
      }
    };
    if (id) {
      fetchCategory();
    }
  }, [id]);

  const fileRef = useRef(null);

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
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        }).catch((error) => {
          console.error("Error getting download URL:", error);
          setFileUploadError(true);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/category/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      navigate('/viewCategories');
    } catch (error) {
      console.error("Error updating user:", error);
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
          <NavLink
            icon={dashboard}
            text="View Categories"
            to="/viewCategories"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 basis-4/5">
        {/* Header */}
        <AdminHeader />
        <div className="p-3 max-w-lg mx-auto mt-12">
          <h1 className="text-3xl text-center font-semibold my-7 text-sideNavText">
            Update Category
          </h1>
          {loading && <p>Loading...</p>}
          {!loading && error && <p className="text-red-500 mt-5">{error}</p>}
          {!loading && category && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="text-sideNavText text-lg">Category Name :</label>
              <input
                type="text"
                placeholder="Category name"
                className="border p-3 rounded-lg bg-sideNavBackground"
                id="categoryname"
                value={formData.categoryname || ""}
                onChange={handleChange}
              />
              <label className="text-sideNavText text-lg">Description :</label>
              <input
                type="text"
                placeholder="Description"
                className="border p-3 rounded-lg bg-sideNavBackground"
                id="description"
                value={formData.description || ""}
                onChange={handleChange}
              />

              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                
              />
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || formData.avatar}
                alt="Profile"
                className="h-24 w-24 object-cover cursor-pointer self-center mt-2"
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

              <button
                disabled={loading}
                className="bg-backgreen4 text-white rounded-2xl h-12 font-semibold text-xl"
              >
                {loading ? "Updating..." : "Update Category"}
              </button>
            </form>
          )}
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
