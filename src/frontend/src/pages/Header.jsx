import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import userService from '../services/user.service.js';
import { useState, useEffect } from 'react';




const Header = () => {

   const navigate = useNavigate();
    const dispatch = useDispatch();
    let userData = useSelector((state) => state.user.user);
    const [user, setUser] = useState(userData);

const handleLogout = async () => {
    // console.log('Logging out user:', user);
    try {
        await userService.logout(user); 
        dispatch(clearUser());
        setUser(null);                
    } catch (error) {
        console.error("Error logging out:", error);
    }
    
    setTimeout(()=>setUser(null),100);
};
return(
<div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center">
        <div className="font-bold text-lg text-gray-800 mr-6">LiveCoding</div>
        <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-800 hover:text-gray-900 font-medium text-sm" onClick={()=>navigate('/')}>Problems</a>
            <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">Contest</a>
            <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">Discuss</a>
            <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">Interview</a>
        </nav>
    </div>
    <div className="flex items-center space-x-3">
        {user ? (
            <button 
                onClick={handleLogout} 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition duration-150"
            >
                Logout
            </button>
        ) : (
            <button 
                onClick={() => setTimeout(()=>{navigate(user ? '/' : '/login')},200) } 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition duration-150"
            >
                {window.location.pathname === "/login" ? "Register" : "Login"}
            </button>
        )}
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
</div>
);
    

};
export default Header;