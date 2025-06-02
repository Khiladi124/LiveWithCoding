import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../slices/userSlice';
import userService from '../services/user.service.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Admin from './Admin.jsx';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let userData = useSelector((state) => state.user.user);
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const problemId = useParams().problemId || null;

    useEffect(() => {
        setUser(userData);
        if(userData?.isVerified === true){ 
            setAdmin(true);
            console.log("Admin", userData?.isVerified);
        } else {
            setAdmin(false);
        }
      
    }, [userData]);

    const handleLogout = async () => {
        try {
            await userService.logout(user);
            dispatch(clearUser());
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        try {
            await userService.logout(user);
            dispatch(clearUser());
            setUser(null);
            setShowLogoutModal(false);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <header className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 shadow-lg relative z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div 
                        className="text-2xl font-bold text-white cursor-pointer hover:text-blue-300 transition-colors"
                        onClick={() => navigate('/')}
                    >
                        LiveCoding
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {admin && (
                            <button
                                onClick={() => navigate(`/admin`)}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-50 shadow-md"
                            >
                                Add Problem
                            </button>
                        )}
                        {admin && problemId && (
                            <button
                                onClick={() => navigate(`/addTestCase/${problemId}`)}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-50 shadow-md"
                            >
                                Add Test Case
                            </button>
                        )}
                        
                        {user ? (
                            <button
                                onClick={handleLogoutClick}
                                className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-50 shadow-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-50 shadow-md"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100]">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                        <div className="flex space-x-3">
                            <button
                                onClick={confirmLogout}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                            <button
                                onClick={cancelLogout}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
