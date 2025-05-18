import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setUser } from '../slices/userSlice.js';
import userService from '../services/user.service.js';

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
            // console.log("User data: ", response.data.data.user); // DEBUGGING
            setUserData(response.data.data.user);
           setTimeout( () => navigate("/"),1500);
        } catch (error) {
            console.log("Login error: ", error.response.data); // DEBUGGING
            setResponse(error.response.data.message || "Login failed");
        }
    };
    
    
    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <input type="email" ref={email} placeholder="Email" required />
                <input type="password" ref={password} placeholder="Password" required />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            {response && <p>{response}</p>}
            <p onClick={() => { navigate("/register"); }}>Don't have an account?</p>
        </div>
    );
};

export default Login;