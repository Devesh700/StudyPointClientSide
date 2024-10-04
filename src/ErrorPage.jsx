import React from 'react';
import errorIcon from "./assets/errorIcon.webp"
const ErrorPage = ({errorInfo}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 md:px-32">
      <div className="bg-white p-6 rounded shadow-lg">
        <img src={errorIcon} className='size-20 mx-auto'/>
        <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
        <p className="mb-4">We are sorry, but something went wrong. Please try again later.</p>
        <p>{errorInfo}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
