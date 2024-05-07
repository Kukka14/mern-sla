// ReviewPage.jsx

import { Label, TextInput, Button } from 'flowbite-react';
import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import StarRatingComponent from 'react-star-rating-component';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ReviewPage() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    comment: '',
    rating: 5,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      
      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      } catch (error) {
        setImageUploadError('Image upload failed (2 mb max per image)');
        setUploading(false);
      }
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        throw new Error('You must upload at least one image');
      }
      if (!formData.rating) {
        throw new Error('Please provide a rating');
      }

      setLoading(true);
      setError(false);
      setSuccessMessage('');

      const formDataWithUserId = {
        ...formData,
        userId: currentUser._id,
      };

      const res = await fetch('/api/review/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUserId),
      });

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await res.json();
      setLoading(false);
      setSuccessMessage('Review submitted successfully!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-200'>
      <div className='p-6 bg-white rounded-lg shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
        <h1 className='text-3xl text-center font-semibold my-7'> Add Review </h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
          <div>
            <Label> Comment</Label>
            <TextInput type='text' placeholder='Comment' id='comment' required onChange={handleChange} value={formData.comment} style={{ height: '35px', width: '130%' }} />
          </div>

          <div>
            <Label>Rating</Label>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={formData.rating}
              onStarClick={(nextValue) => setFormData({ ...formData, rating: nextValue })}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="images" className="block text-lg font-semibold">
              Images
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

              <Button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="bg-green-500 text-white px-6 py-3 rounded-lg ml-4 hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
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
                    <Button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 m-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <Button
              disabled={loading || uploading}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>

        {successMessage && <p className="text-green-700 text-sm">{successMessage}</p>}

      </div>
    </div>
  );
};
