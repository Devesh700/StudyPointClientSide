import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from '../store/slices/userSlice';

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(logInUser(data)).then((data)=>{
      console.log(data);
          if(data?.error){
        //alert(data.payload?.err?.errors || data.payload?.errors)
      }
      else{
        //alert(data.payload?.message)
        localStorage.setItem("accessToken",data?.payload?.data?.accessToken)
        localStorage.setItem("refreshToken",data?.payload?.data?.refreshToken)
        sessionStorage.setItem("user",JSON.stringify(data.payload.data));
        navigate(`/user/${data.payload.data.user._id}`,{state:{user:data.payload.data.user}});
      }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Log in
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
