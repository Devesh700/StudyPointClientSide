import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../store/slices/userSlice';
  const baseUrl=import.meta.env.VITE_BASE_URL;
const version=import.meta.env.VITE_VERSION;
const Register = () => {
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    dispatch(registerUser(data)).then(data=>{
      console.log(data)
      if(data?.error){
        alert(data.payload?.err?.errors || data.payload?.errors)
      }
      else{
        alert(data.payload?.message)
        localStorage.setItem("accessToken",data?.payload?.data?.accessToken)
        localStorage.setItem("refreshToken",data?.payload?.data?.refreshToken)
        sessionStorage.setItem("user",JSON.stringify(data.payload.data));
      }
      });
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName', { required: 'Full Name is required' })}
              className={`mt-1 p-2 block w-full border rounded-md ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              className={`mt-1 p-2 block w-full border rounded-md ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobileNo"
              type="tel"
              {...register('mobileNo', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Must be a valid 10-digit phone number',
                },
              })}
              className={`mt-1 p-2 block w-full border rounded-md ${
                errors.mobileNo ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.mobileNo && <p className="text-red-500 text-xs">{errors.mobileNo.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`mt-1 p-2 block w-full border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <input
              id="avatar"
              type="file"
              // {...register('avatar')}
              className="mt-1 block w-full"
            />
            {errors.avatar && <p className="text-red-500 text-xs">{errors.avatar.message}</p>}
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <input
              id="coverImage"
              type="file"
              // {...register('coverImage')}
              className="mt-1 block w-full"
            />
            {errors.coverImage && <p className="text-red-500 text-xs">{errors.coverImage.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
