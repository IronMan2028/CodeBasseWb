import { useState } from 'react';
import { useSendPasswordResetEmailMutation } from "../../../services/UserAuthApi";

const SendPasswordResetEmail = () => {
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    };

    try {
      const res = await sendPasswordResetEmail(actualData);
      if (res.error) {
        setServerMsg({});
        setServerError(res.error.data.errors);
      } else if (res.data) {
        setServerError({});
        setServerMsg(res.data);
        e.target.reset();
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} id="password-reset-email-form">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {serverError.email && (
                <p className="text-red-500 text-xs italic">{serverError.email[0]}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type='submit'
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
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

export default SendPasswordResetEmail;
