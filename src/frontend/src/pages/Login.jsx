import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice.js';
import userService from '../services/user.service.js';
import Header from './Header.jsx';

const Login = () => {
    const email = useRef(null);
    const password = useRef(null);
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();
    const setUserData = (user) => {
        // console.log("Setting user data: ", user); // DEBUGGING
        dispatch(setUser(user));
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailValue = email.current.value.trim();
        const passwordValue = password.current.value.trim();
    
        if (!emailValue || !passwordValue) {
            console.log("Email or password is empty");
            return;
        }
       
        console.log("Login called with email: " + emailValue); // DEBUGGING
        try {
            const response = await userService.login(emailValue, passwordValue);
            //  console.log("Response",response.data); // DEBUGGING
            setResponse("Login successful");
             console.log("User data: ", response.data.data.user); // DEBUGGING
            setUserData(response.data.data.user);
           setTimeout( () => navigate("/"),1500);
        } catch (error) {
            console.log("Login error: ", error.response.data); // DEBUGGING
            setResponse(error.response.data.message || "Login failed");
        }
    };
    
    
    return (
        <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* LeetCode-like Header */}
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={(e) => { e.preventDefault();}} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    ref={email}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    ref={password}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {response && (
                        <div className={`mt-4 p-3 rounded-md ${response.includes("successful") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                            {response}
                        </div>
                    )}

                    <div className="mt-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <span 
                                    onClick={() => { navigate("/register"); }} 
                                    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                >
                                    Register now
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
       
    );
};

export default Login;