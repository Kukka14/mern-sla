import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    regularPrice: 50,
    quantity: 0,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
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
      setImageUploadError("You can only upload 6 images per listing");
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
    }

    if (
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
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData directly
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <div className="bg-gray- rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Create a Listing
        </h1>
        <form onSubmit={handleSubmit}>
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
                placeholder="Name"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                id="name"
                maxLength="62"
                minLength="10"
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
              <label htmlFor="pprice" className="block text-lg font-semibold">
                Product Price (Rs:)
              </label>
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.regularPrice}
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="pprice" className="block text-lg font-semibold">
                Quantity (Rs:)
              </label>
              <input
                type="number"
                id="quantity"
                min="0"
                max="10000000"
                required
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.quantity}
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="images" className="block text-lg font-semibold">
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
                  className="bg-green-500 text-white px-6 py-3 rounded-lg ml-4 hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>

              <p className="text-gray-500 text-sm">
                The first image will be the cover photo
              </p>
            </div>
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

          <div className="sm:col-span-2">
            <button
              disabled={loading || uploading}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {loading ? "Creating..." : "Create listing"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
