import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useChangeUserPasswordMutation } from '../../../services/UserAuthApi';
import { getToken, removeToken } from '../../../services/LocalStorageService';

const ChangePassword = () => {
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});
  const [changeUserPassword] = useChangeUserPasswordMutation();
  const { access_token } = getToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    };

    try {
      const res = await changeUserPassword({ actualData, access_token });
      if (res.error) {
        setServerMsg({});
        setServerError(res.error.data.errors);
      }
      if (res.data) {
        setServerError({});
        setServerMsg(res.data);
        document.getElementById('password-change-form').reset();
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  // Getting User Data from Redux Store
  const myData = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <form onSubmit={handleSubmit} noValidate id="password-change-form" className="space-y-4 w-full">
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm mb-1">New Password:</label>
          <input type="password" id="password" name="password" required className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {serverError.password && (
            <p className="text-red-500 text-xs mt-1">{serverError.password[0]}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password2" className="text-sm mb-1">Confirm New Password:</label>
          <input type="password" id="password2" name="password2" required className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {serverError.password2 && (
            <p className="text-red-500 text-xs mt-1">{serverError.password2[0]}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update
          </button>
        </div>
        {serverError.non_field_errors && (
          <div className="text-red-500 mt-2">{serverError.non_field_errors[0]}</div>
        )}
        {serverMsg.msg && (
          <div className="text-green-500 mt-2">{serverMsg.msg}</div>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
