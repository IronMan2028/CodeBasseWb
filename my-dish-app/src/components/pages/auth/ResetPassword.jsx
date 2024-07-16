import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../../../services/UserAuthApi";

const ResetPassword = () => {
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});
  const [resetPassword] = useResetPasswordMutation();
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    };

    try {
      const res = await resetPassword({ actualData, id, token });
      if (res.error) {
        setServerMsg({});
        setServerError(res.error.data.errors);
      } else if (res.data) {
        setServerError({});
        setServerMsg(res.data);
        document.getElementById('password-reset-form').reset();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} id="password-reset-form">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
              />
              {serverError.password && (
                <p className="text-red-500 text-xs italic">{serverError.password[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="password2" className="sr-only">Confirm New Password</label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
              />
              {serverError.password2 && (
                <p className="text-red-500 text-xs italic">{serverError.password2[0]}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
        {serverError.non_field_errors && (
          <div className="text-red-500 text-xs italic mt-4">{serverError.non_field_errors[0]}</div>
        )}
        {serverMsg.msg && (
          <div className="text-green-500 text-xs italic mt-4">{serverMsg.msg}</div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
