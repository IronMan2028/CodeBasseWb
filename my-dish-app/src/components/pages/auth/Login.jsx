import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../features/authSlice';
import { getToken, storeToken } from '../../../services/LocalStorageService';
import { useLoginUserMutation } from '../../../services/UserAuthApi';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUserMutation] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await loginUserMutation(formData);
      if (data && data.token) {
        console.log(data.token);
        storeToken(data.token);
        dispatch(setUserToken({ access_token: data.token }));
        setServerError({});
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setServerError(error.response.data);
      } else {
        console.error('Error during login:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { access_token } = getToken();
    if (access_token) {
      dispatch(setUserToken({ access_token }));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} id="login-form">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
              {serverError.email && (
                <p className="text-red-500 text-xs mt-1">{serverError.email[0]}</p>
              )}
            </div>
            <div className="py-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              {serverError.password && (
                <p className="text-red-500 text-xs mt-1">{serverError.password[0]}</p>
              )}
            </div>
          </div>

          {serverError.non_field_errors && (
            <div className="text-red-500 text-sm">{serverError.non_field_errors[0]}</div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <NavLink
                to="/sendpasswordresetemail"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </NavLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <NavLink
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
