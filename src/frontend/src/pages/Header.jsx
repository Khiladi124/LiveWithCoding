import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser, setUser } from '../slices/userSlice';
import userService from '../services/user.service.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Admin from './Admin.jsx';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let userData = useSelector((state) => state.user.user);s
    let accessToken = useSelector((state) => state.user.accessToken);
    let refreshToken = useSelector((state) => state.user.refreshToken);
    const [localUser, setLocalUser] = useState(null);s
    const [admin, setAdmin] = useState(false);
    const problemId = useParams().problemId || null;

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    useEffect(() => {
        const checkTokenExpiration = async () => {
            console.log("Checking token expiration");
            if (userData && accessToken) {
                if (!isTokenExpired(accessToken)) {
                    console.log("Token is valid, setting user data");
                    setLocalUser(userData);
                    if(userData?.isVerified === true){ 
                        setAdmin(true);
                        console.log("Admin", userData?.isVerified);
                    } else {
                        setAdmin(false);
                    }
                } else {
                    // console.log("Access token is expired, attempting to refresh");
                    if (refreshToken && !isTokenExpired(refreshToken)) {
                        try {
                            const response = await userService.refreshToken(refreshToken);
                            if (response.data && response.data.data.accessToken) {
                                setLocalUser(response.data.data.user);
                                const freshUser = response.data.data.user;
                                const  freshAccessToken = response.data.data.accessToken;
                                const freshRefreshToken = response.data.data.refreshToken;
                                
                                dispatch(setUser({
                                    user: freshUser,
                                    accessToken: freshAccessToken,
                                    refreshToken: freshRefreshToken
                                }));
                                // console.log("User data after refresh:", freshUser);
                                if(freshUser?.isVerified === true){ 
                                    setAdmin(true);
                                } else {
                                    setAdmin(false);
                                }
                            } else {
                                throw new Error("Failed to refresh token");
                            }
                        } catch (error) {
                            console.log("Failed to refresh token, clearing user data", error);
                            setLocalUser(null);
                            setAdmin(false);
                            dispatch(clearUser());
                        }
                    } else {
                        console.log("Refresh token is missing or expired, clearing user data");
                        setLocalUser(null);
                        setAdmin(false);
                        dispatch(clearUser());
                    }
                }
            } else {
                console.log("No user data or access token available");
                setLocalUser(null);
                setAdmin(false);
            }
        };

        checkTokenExpiration();
        
        // Set up interval to check token expiration periodically
        const interval = setInterval(checkTokenExpiration, 10000); // Check every 10 seconds
        
        return () => clearInterval(interval);
    }, [userData, accessToken, dispatch, refreshToken]);

    const handleLogout = async () => {
        try {
            await userService.logout(localUser);
            dispatch(clearUser());
            setLocalUser(null);
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
            await userService.logout(localUser);
            dispatch(clearUser());
            setLocalUser(null);
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
                        <button
                            onClick={() => navigate('/home')}
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-50 shadow-md"
                        >
                            Problems
                        </button>
                       
                        
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
                        
                        {localUser ? (
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
                         <button
                            onClick={() => navigate('/about')}
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-50 shadow-md"
                        >
                            About
                        </button>
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
