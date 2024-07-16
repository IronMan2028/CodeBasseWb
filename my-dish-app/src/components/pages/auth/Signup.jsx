import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, FormControlLabel, Checkbox, Button, Box, Typography } from '@mui/material';
import { useRegisterUserMutation } from '../../../services/UserAuthApi'; // Update the path as per your project structure
import { storeToken } from '../../../services/LocalStorageService'; // Update the path as per your project structure

const Signup = () => {
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password_confirmation'), // Ensure this matches 'password2'
      tc: data.get('tc') === 'on', // Convert checkbox value to boolean
    };

    try {
      const response = await registerUser(actualData);

      if (response.error) {
        setServerError(response.error.data.errors);
      } else if (response.data.token) {
        storeToken(response.data.token); // Store token in localStorage
        navigate('/dashboard'); // Redirect to dashboard after successful registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} id="registration-form">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-2">
              <TextField
                id="name"
                name="name"
                type="text"
                required
                fullWidth
                label="Full Name"
                variant="outlined"
                error={!!serverError.name}
                helperText={serverError.name && serverError.name[0]}
              />
            </div>
            <div className="py-2">
              <TextField
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                fullWidth
                label="Email Address"
                variant="outlined"
                error={!!serverError.email}
                helperText={serverError.email && serverError.email[0]}
              />
            </div>
            <div className="py-2">
              <TextField
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                label="Password"
                variant="outlined"
                error={!!serverError.password}
                helperText={serverError.password && serverError.password[0]}
              />
            </div>
            <div className="py-2">
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                autoComplete="new-password"
                required
                fullWidth
                label="Confirm Password"
                variant="outlined"
                error={!!serverError.password_confirmation}
                helperText={serverError.password_confirmation && serverError.password_confirmation[0]}
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <FormControlLabel
              control={<Checkbox id="tc" name="tc" color="primary" />}
              label="I agree to terms and conditions"
            />
            {serverError.tc && <Typography className="text-red-600 text-sm ml-2">{serverError.tc[0]}</Typography>}
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            disabled={isLoading}
            className="mt-4"
          >
            Sign Up
          </Button>

          {serverError.non_field_errors && (
            <Typography className="text-red-600 text-sm mt-2">
              {serverError.non_field_errors[0]}
            </Typography>
          )}

        </form>

        <div className="text-sm mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
