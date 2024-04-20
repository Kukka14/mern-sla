import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import StarRatingComponent from 'react-rating-stars-component';

const UpdateReviewPage = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        comment: '',
        rating: 5,
        imageUrl: [],
    });

    useEffect(() => {
        fetchReview();
    }, []);

    const fetchReview = async () => {
        try {
            const response = await axios.get(`/api/review/${id}`);
            const { comment, rating, imageUrl } = response.data;
            setFormData({ comment, rating, imageUrl });
        } catch (error) {
            console.error('Error fetching review:', error);
        }
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
            await axios.put(`/api/review/${id}`, formData);
            // Redirect user to review listing page after successful update
            window.location.href = "/reviewlisting";
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-200'>
            <div className='p-6 bg-white rounded-lg shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
                <h1 className='text-3xl text-center font-semibold my-7'>Update Review</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
                    <div>
                        <Label>Comment</Label>
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
                    <div>
                        <Button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95' type='submit'>Update</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateReviewPage;
