import React from 'react';
import { useState, useRef, useEffect } from 'react';
// import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service.js';
import Header from './Header.jsx';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyles = {
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    error: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    )
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${toastStyles[type]} px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border border-white/20 flex items-center space-x-3 min-w-[300px] max-w-md`}>
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Register = () => {
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const fullName = useRef(null);
  const [response, setResponse] = useState("");
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (response === "Registration successful") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [response, navigate]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const emailValue = email.current.value;
    const usernameValue = username.current.value;
    const passwordValue = password.current.value;
    const confirmPasswordValue = confirmPassword.current.value;
    const fullNameValue = fullName.current.value;
    
    if (passwordValue !== confirmPasswordValue) {
      showToast("Passwords do not match!", "error");
      setIsLoading(false);
      return;
    }

    if (passwordValue.length < 6) {
      showToast("Password must be at least 6 characters long!", "warning");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await userService.register(fullNameValue, usernameValue, emailValue, passwordValue);
      
      if (response.message === "Request failed with status code 500") {
        setResponse("Registration failed");
        showToast("Registration failed! Please try again.", "error");
      } else {
        setResponse("Registration successful");
        showToast("Registration successful! Redirecting to login...", "success");
        
        // Clear form fields
        email.current.value = "";
        username.current.value = "";
        password.current.value = "";
        confirmPassword.current.value = "";
        fullName.current.value = "";
      }
    } catch (error) {
      console.log(error);
      showToast("An error occurred during registration!", "error");
      setResponse("Registration failed");
    } finally {
      setIsLoading(false);
    }
    
    console.log("Registration form submitted");
  };

  return (
    <>
      <Header />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      
      {
        response === "Registration successful" ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-600 font-semibold text-lg">Registration successful!</p>
              <p className="text-gray-500 mt-2">Redirecting to login page...</p>
              <div className="mt-4">
                <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
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
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Create a password (min. 6 characters)"
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
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <span onClick={() => navigate("/login")} className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200 cursor-pointer">
                      Sign in here
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Register;