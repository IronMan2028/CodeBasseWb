// DishDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DishDetail = () => {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDishDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/dishes/${id}/`);
        setDish(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching dish details. Please try again later.');
        setLoading(false);
      }
    };

    fetchDishDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!dish) {
    return <div className="text-center mt-8">Dish not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img src={dish.imageUrl} alt={dish.dishName} className="w-full h-64 object-cover" />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{dish.dishName}</h1>
          <p className="text-gray-600 mb-4">{dish.description}</p>
          <p className="text-gray-800 font-semibold mb-2">Price: ${dish.price}</p>
          <p className="text-gray-800 mb-4">Availability: {dish.isPublished ? 'Available' : 'Not Available'}</p>
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;

