import React, { useRef } from 'react';
import userService from '../services/user.service.js';

const VerifyEmail = () => {
    const inputemail = useRef();
    const inputotp = useRef();
    
    const Submit = async (e) => {
        e.preventDefault();
        const email = inputemail.current.value;
        const otp = inputotp.current.value;
        const resp = await userService.verifyEmail(email, otp);
        if (resp.status === 200) {
            // Success notification
            const successDiv = document.createElement('div');
            successDiv.innerHTML = `
            <div class="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-slide-in">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="font-medium">${resp.data.message}</span>
            </div>
            `;
            document.body.appendChild(successDiv);
            setTimeout(() => successDiv.remove(), 3000);
        } else {
            // Error notification
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `
            <div class="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-slide-in">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="font-medium">${resp.data.message}</span>
            </div>
            `;
            document.body.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 3000);
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600">Enter your email and the OTP code we sent you</p>
                </div>
                
                <form onSubmit={Submit} className="space-y-6">
                    <div>
                        <input 
                            placeholder="Email address" 
                            ref={inputemail} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400"
                            type="email"
                            required
                        />
                    </div>
                    
                    <div>
                        <input 
                            placeholder="Enter OTP code" 
                            ref={inputotp} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400 text-center text-lg tracking-widest"
                            type="text"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition duration-300 transform hover:scale-[1.02]"
                    >
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;