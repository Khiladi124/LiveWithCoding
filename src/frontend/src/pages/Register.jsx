import React from 'react';
import { useState, useRef } from 'react';
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
        (!response) ? (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-lg shadow-md">
              <div>
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Create Account
                </h1>
              </div>
              
              <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        ref={fullName}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        ref={email}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        ref={username}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Choose a username"
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
                        name="password"
                        type="password"
                        ref={password}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        ref={confirmPassword}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    onClick={handleRegister}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    Register
                  </button>
                </div>
              </form>
              
              <div className="text-sm text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Login here
                  </a>
                </p>
              </div>
              
              {response && (
                <div className="mt-4 rounded-md bg-teal-50 p-4">
                  <p className="text-sm font-medium text-teal-800 text-center">
                    {response}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          navigate("/login")
        )
      }
    </>
  );
};

export default Register;