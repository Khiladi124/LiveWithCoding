import React from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../slices/userSlice';    
import { useDispatch } from 'react-redux';
import  userService from '../services/user.service.js';
import { useState } from 'react';
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [response, setResponse] = useState(null);
    let user = useSelector((state) => state.user.user);
   
     const handleLogout = async () => {
        // console.log('Logging out user:', user);
        const resp= await userService.logout(user);
        setResponse(resp.data.message || "Logout failed");
        dispatch(clearUser());
        user = null;
        
    };

    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '50px', color:'black' }}>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of the application.</p>
           {user?(<button onClick={handleLogout}>Logout</button>):(<button onClick={() => navigate('/login')}>Login/Register</button>)}
           
        </div>
    );
};

export default Home;

//