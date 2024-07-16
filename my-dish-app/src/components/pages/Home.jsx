// Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/dishes/');
        setDishes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching dishes. Please try again later.');
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-2xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900">Welcome to Our Restaurant</h2>
          <p className="mt-2 text-lg text-gray-600">Explore delicious dishes from around the world.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish) => (
              <div key={dish.id} className="bg-white overflow-hidden shadow-md rounded-lg">
                <img src={dish.imageUrl} alt={dish.dishName} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{dish.dishName}</h3>
                  <p className="mt-2 text-gray-600">{dish.isPublished ? 'Available' : 'Not Available'}</p>
                  <Link
                    to={`/dish/${dish.id}`}
                    className="mt-4 block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
