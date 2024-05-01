import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "./../../images/logo2.png";
import dashboard from "./../../images/icons8-arrow-50 (1).png";
import AdminHeader from "../../components/AdminHeader";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    regularPrice: 50,
    quantity: 0,
    category: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/getAllCategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProduct = async () => {
      const productId = params.id;
      const res = await fetch(`/api/listing/${productId}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
      // Set current category in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: data.category._id,
      }));
    };

    fetchCategories();
    fetchProduct();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 11) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 10 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    } else if (e.target.id === "category") {
      setFormData({
        ...formData,
        category: e.target.value,
      });
    } else if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        // If successful, navigate to ProductAdminDashboard
        navigate("/product-view");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
        </div>
      </div>

      <div className="basis-4/5 ">
        <AdminHeader />
        <main className="p-3 w-11/12 mx-auto flex justify-center flex-col">
          <div className="flex justify-center mt-3">
            <h1 className="text-center text-3xl font-bold mb-4 w-1/2 border-b-2 border-green-600 py-2">
              Update Listing
            </h1>
          </div>
          <div className="bg-green-100 rounded-lg shadow-md p-8 mt-2 ">
            {/* Move image upload and create listing part to the right side */}

            <form onSubmit={handleSubmit} className="items-center space-y-4 ">
              <div className="flex flex-row">
                <div className="basis-1/2">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div className="space-y-4">
                      <label
                        htmlFor="product_name"
                        className="block text-lg font-semibold"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                        id="name"
                        maxLength="62"
                        minLength="1"
                        required
                        onChange={handleChange}
                        value={formData.name}
                      />
                    </div>

                    <div className="space-y-4">
                      <label
                        htmlFor="product_description"
                        className="block text-lg font-semibold"
                      >
                        Product Description
                      </label>
                      <textarea
                        type="text"
                        placeholder="Description"
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                        id="description"
                        required
                        onChange={handleChange}
                        value={formData.description}
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-lg font-semibold">
                        Product Type
                      </label>
                      <div className="mr-4">
                        <input
                          type="checkbox"
                          id="sale"
                          className="w-5 mr-2"
                          onChange={handleChange}
                          checked={formData.type === "sale"}
                        />
                        <label htmlFor="sale" className="font-semibold">
                          For Sale
                        </label>
                      </div>

                      <div className="mr-4">
                        <input
                          type="checkbox"
                          id="rent"
                          className="w-5 mr-2"
                          onChange={handleChange}
                          checked={formData.type === "rent"}
                        />
                        <label htmlFor="sale" className="font-semibold">
                          For Rent
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label
                        htmlFor="pprice"
                        className="block text-lg font-semibold"
                      >
                        Product Price (Rs:)
                      </label>
                      <input
                        type="number"
                        id="regularPrice"
                        min="1"
                        max="10000000"
                        step="any"
                        required
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                        onChange={handleChange}
                        value={formData.regularPrice}
                      />
                    </div>

                    <div className="space-y-4">
                      <label
                        htmlFor="pprice"
                        className="block text-lg font-semibold"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max="10000000"
                        required
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                        onChange={handleChange}
                        value={formData.quantity}
                      />
                    </div>

                    <div className="space-y-4">
                      <label
                        htmlFor="pcategory"
                        className="block text-lg font-semibold"
                      >
                        Product category
                      </label>

                      <select
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Image upload and create listing part */}
                <div className="basis-1/2">
                  <div className="bg-green-100 rounded-lg  ml-8  ">
                    <div className="space-y-4">
                      <label
                        htmlFor="images"
                        className="block text-lg font-semibold"
                      >
                        Product Images
                      </label>

                      <div className="flex items-center">
                        <input
                          onChange={(e) => setFiles(e.target.files)}
                          className="p-3 border border-gray-300 rounded w-full"
                          type="file"
                          id="images"
                          accept="image/*"
                          multiple
                        />

                        <button
                          type="button"
                          disabled={uploading}
                          onClick={handleImageSubmit}
                          className="bg-green-400 text-white px-6 py-3 rounded-lg ml-4 hover:bg-green-500 focus:outline-none focus:bg-green-600"
                        >
                          {uploading ? "Uploading..." : "Upload"}
                        </button>
                      </div>

                      <p className="text-gray-500 text-sm">
                        The first image will be the cover photo
                      </p>
                    </div>

                    <div className="flex justify-center items-center h-full">
                      <div className="grid grid-cols-3 gap-4 mb-8 mt-8">
                        {formData.imageUrls.length > 0 &&
                          formData.imageUrls.map((url, index) => (
                            <div key={url} className="relative">
                              <img
                                src={url}
                                alt="listing image"
                                className="w-full h-auto object-contain rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 m-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  disabled={loading || uploading}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg  hover:bg-green-700 focus:outline-none focus:bg-blue-600 w-2/4 "
                >
                  {loading ? "Updating..." : "Update listing"}
                </button>
                {error && <p className="text-red-700 text-sm">{error}</p>}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

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
