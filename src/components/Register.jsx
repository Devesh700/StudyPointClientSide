import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../store/slices/userSlice';
const baseUrl = import.meta.env.VITE_BASE_URL;
const version = import.meta.env.VITE_VERSION;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null); // Ref to access form elements
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData(); // Create a new FormData object

    // Append form fields to FormData
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('mobileNo', data.mobileNo);
    formData.append('password', data.password);

    // Append avatar file (using formRef to access the file input)
    const avatarFile = formRef.current.querySelector('input[name="avtar"]').files[0];
    console.log(data)
    console.log(avatarFile)
    if (avatarFile) {
      formData.append('avtar', avatarFile);
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.error) {
        // Handle error
      } else {
        localStorage.setItem('accessToken', data?.payload?.data?.accessToken);
        localStorage.setItem('refreshToken', data?.payload?.data?.refreshToken);
        sessionStorage.setItem('user', JSON.stringify(data.payload.data));
        navigate(`/user/${data.payload.data.user.fullName}/${data.payload.data.user._id}`, {
          state: { user: data.payload.data.user },
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
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
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must not be less than 8 characters with one uppercase, one special, and one numeric character',
                },
              })}
              className={`mt-1 p-2 block w-full border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="avtar" className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <input
              id="avtar"
              name="avtar"
              type="file"
              className="mt-1 block w-full"
              accept="image/*"
            />
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
