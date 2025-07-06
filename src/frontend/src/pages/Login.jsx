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
    const [response, setResponse] = useState("");
    const dispatch = useDispatch();
    const setUserData = (resp) => {
        // console.log("Setting user data: ", user); // DEBUGGING
        const user=resp.user;
        const accessToken=resp.accessToken;
        const refreshToken=resp.refreshToken;
        console.log(resp);
        dispatch(setUser({user, accessToken, refreshToken}));
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
             
            setUserData(response.data.data);
           setTimeout( () => navigate("/"),1000);
        } catch (error) {
            console.log("Login error: ", error); // DEBUGGING
            setResponse(error || "Login failed");
        }
    };
    
    
    return (
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Elegant floating geometric shapes */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-32 w-24 h-24 border border-green-500 rotate-45 animate-bounce" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-40 left-40 w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-60 left-1/3 w-20 h-20 border-2 border-emerald-500 rounded-lg rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-60 right-20 w-28 h-28 border border-green-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-700 rounded-full animate-bounce" style={{animationDuration: '4s'}}></div>
            </div>

            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.2) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <h2 className="mt-6 text-center text-3xl font-light text-gray-800 drop-shadow-sm tracking-wide">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Sign in to continue your journey
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white/90 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-emerald-200/50">
                    <form onSubmit={(e) => { e.preventDefault();}} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    ref={email}
                                    required
                                    className="appearance-none block w-full px-4 py-3 bg-gray-50/80 border border-emerald-300/60 rounded-xl shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm backdrop-blur-sm transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    ref={password}
                                    required
                                    className="appearance-none block w-full px-4 py-3 bg-gray-50/80 border border-emerald-300/60 rounded-xl shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm backdrop-blur-sm transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {response && (
                        <div className={`mt-6 p-4 rounded-xl backdrop-blur-sm ${typeof response === 'string' && response.includes("successful") ? "bg-emerald-100/80 text-emerald-800 border border-emerald-300/60" : "bg-red-100/80 text-red-800 border border-red-300/60"}`}>
                            {response}
                        </div>
                    )}

                    <div className="mt-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <span 
                                    onClick={() => { navigate("/register"); }} 
                                    className="font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors duration-200 underline decoration-emerald-500/50 hover:decoration-emerald-600/70"
                                >
                                    Create one now
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Forget Password ?{' '}
                                <span 
                                    onClick={() => { navigate("/resetPassword"); }} 
                                    className="font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors duration-200 underline decoration-emerald-500/50 hover:decoration-emerald-600/70"
                                >
                                    Reset Password
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