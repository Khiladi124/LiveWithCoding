import React from 'react';
import userService from '../services/user.service';
import {useRef} from 'react';

const ResetPassword = () => {
    const emailRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value.trim();
    console.log("Resetting password for email: " + email); // DEBUGGING
    const response = await userService.resetPassword(email);
    response.then(res => {
      if (res.status === 200) { 
        alert("Reset link sent to your email!");
        } else {
        alert("Failed to send reset link. Please try again.");
        }
    });
  };



return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" ref={emailRef} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Send Reset Link</button>
            </form>
        </div>
    </div>
);

}

export default ResetPassword;