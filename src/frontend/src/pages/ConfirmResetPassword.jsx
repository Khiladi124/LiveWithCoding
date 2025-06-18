import React from 'react';
import userService from '../services/user.service';
import {useParams} from 'react-router-dom';

const ConfirmResetPassword = ()=>{
    
    const { activationToken } = useParams();

    const handleSubmit =async (event) => {
        event.preventDefault();
        const newPassword = event.target['new-password'].value;
        const response =await userService.confirmResetPassword(activationToken , newPassword);
        console.log(response);
       
            if (response.status === 200) {
            // Success notification
            const successDiv = document.createElement('div');
            successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            successDiv.textContent = response.data.message ;
            document.body.appendChild(successDiv);
            setTimeout(() => successDiv.remove(), 3000);
            } else {
            // Error notification
            const errorDiv = document.createElement('div');
            errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            errorDiv.textContent = 'Failed to reset password. Please try again.';
            document.body.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 3000);
            }
       
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" id="new-password" name="new-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmResetPassword;