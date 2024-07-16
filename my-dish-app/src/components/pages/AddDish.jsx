// AddDishForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AddDish = ({ onAdd }) => {
  const [dishName, setDishName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/dishes/', {
        dishName,
        imageUrl,
        isPublished,
      });
      onAdd(response.data);
      setDishName('');
      setImageUrl('');
      setIsPublished(false);
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Dish</h2>
      <div className="mb-6">
        <label htmlFor="dishName" className="block text-sm font-medium text-gray-700 mb-2">
          Dish Name
        </label>
        <input
          type="text"
          id="dishName"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="isPublished" className="block text-sm font-medium text-gray-700 mb-2">
          Publish Status
        </label>
        <select
          id="isPublished"
          value={isPublished}
          onChange={(e) => setIsPublished(e.target.value === 'true')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          required
        >
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Dish
      </button>
    </form>
  );
};

export default AddDish;