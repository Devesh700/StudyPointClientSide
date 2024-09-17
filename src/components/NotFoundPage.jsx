import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-center text-gray-600 mb-6">
        The page you are looking for does not exist. Please check the URL or go back to the homepage.
      </p>
      <div className="flex justify-center">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
