import React from 'react';
import { useState, useRef, useEffect } from 'react';
// import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service.js';
import Header from './Header.jsx';

const Register = () => {
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const fullName = useRef(null);
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (response === "Registration successful") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [response, navigate]);
  
  const handleRegister = (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const usernameValue = username.current.value;
    const passwordValue = password.current.value;
    const confirmPasswordValue = confirmPassword.current.value;
    const fullNameValue = fullName.current.value;
    
    if (passwordValue !== confirmPasswordValue) {
      alert("Passwords do not match");
      return;
    }
    
    userService.register(fullNameValue, usernameValue, emailValue, passwordValue)
      .then((response) => {
        if (response.message === "Request failed with status code 500") {
          setResponse("Registration failed");
          alert("Registration failed");
        }
        else {
          setResponse("Registration successful");
          alert("Registration successful");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
    email.current.value = null;
    username.current.value = null;
    password.current.value = null;
    confirmPassword.current.value = null;
    fullName.current.value = null;
    console.log("Registration form submitted");

    }
  return (
    <>
      <Header />
      {
        response === "Registration successful" ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-green-600 font-semibold">Registration successful! Redirecting to login...</p>
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300d4aa%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2030c0-6.627-5.373-12-12-12s-12%205.373-12%2012%205.373%2012%2012%2012%2012-5.373%2012-12zm-24%200c0-6.627-5.373-12-12-12s-12%205.373-12%2012%205.373%2012%2012%2012%2012-5.373%2012-12z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            
            <div className="flex items-center justify-center min-h-screen">
              <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/20 relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-lg"></div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                    Create Account
                  </h1>
                  <p className="mt-2 text-gray-600">Join our platform today</p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        ref={fullName}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        ref={email}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        ref={username}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="Choose a username"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        ref={password}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="Create a password"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        ref={confirmPassword}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      onClick={handleRegister}
                      className="w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
                
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <p onClick={() => navigate("/login")} href="/login" className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200">
                      Sign in here
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Register;