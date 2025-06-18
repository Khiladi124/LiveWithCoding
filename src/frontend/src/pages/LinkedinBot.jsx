import React from 'react';
import {useRef} from 'react';
import linkedinBotServices from '../services/linkedinBot.service';

const LinkedinBot = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const companyNameRef = useRef(null);
    const messageTextRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const companyName = companyNameRef.current.value;
        const messageText = messageTextRef.current.value;
          console.log("Form submitted with:", { email, password, companyName, messageText });
          try {
                const response = await linkedinBotServices.linkedinBot({
                     email,
                     password,   
                     companyName,
                     messageText
                });
                console.log("Response from LinkedIn Bot:", response);
                alert("LinkedIn Bot executed successfully!");
          } catch (error) {
                console.error("Error executing LinkedIn Bot:", error);
                alert("Failed to execute LinkedIn Bot. Please check the console for details.");
          }
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
                     <div className="text-center mb-8">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                          </div>
                          <h1 className="text-3xl font-bold text-gray-900 mb-2">LinkedIn Bot</h1>
                          <p className="text-gray-600">Automate your LinkedIn outreach</p>
                     </div>

                     <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                     Email Address
                                </label>
                                <input
                                     type="email"
                                     id="email"
                                     ref={emailRef}
                                     placeholder="Enter your LinkedIn email"
                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                     required
                                />
                          </div>

                          <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                     Password
                                </label>
                                <input
                                     type="password"
                                     id="password"
                                     ref={passwordRef}
                                     placeholder="Enter your LinkedIn password"
                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                     required
                                />
                          </div>

                          <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                                     Target Company
                                </label>
                                <input
                                     type="text"
                                     id="companyName"
                                     ref={companyNameRef}
                                     placeholder="Company name to target"
                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                     required
                                />
                          </div>

                          <div>
                                <label htmlFor="messageText" className="block text-sm font-medium text-gray-700 mb-2">
                                     Message Template
                                </label>
                                <textarea
                                     id="messageText"
                                     ref={messageTextRef}
                                     placeholder="Enter your outreach message..."
                                     rows="4"
                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                                     required
                                ></textarea>
                          </div>

                          <button 
                               type="submit" 
                               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
                          >
                                <span>Execute LinkedIn Bot</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-200">
                                     <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                          </button>
                     </form>
                </div>
          </div>
     );
};

export default LinkedinBot;