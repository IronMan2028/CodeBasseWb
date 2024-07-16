import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900">Error 404</h1>
        <p className="mt-2 text-sm text-gray-700">Page not found!</p>
      </div>
    </div>
  );
};

export default NotFound;
