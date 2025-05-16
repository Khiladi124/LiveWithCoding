import React from 'react';
import {useState, useRef} from 'react';
// import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import userService from '../services/user.service.js';
const Register = () =>{
    const email=useRef(null);
    const username=useRef(null);
    const password=useRef(null);
    const confirmPassword=useRef(null);
    const fullName=useRef(null);
    const [response, setResponse] = useState(null);
    
    const navigate=useNavigate();
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
        userService.register(fullNameValue, usernameValue, emailValue,  passwordValue) 
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
    };
    return(
       
            <>
                {
                (!response) ? (
                    <>
                        <div>
                            <h1>Register</h1>
                            <form onSubmit={(e) => { e.preventDefault(); }}>
                                <input type="email" ref={email} placeholder="Email" />
                                <input type="text" ref={username} placeholder="Username" />
                                <input type="password" ref={password} placeholder="Password" />
                                <input type="password" ref={confirmPassword} placeholder="Confirm Password" />
                                <input type="text" ref={fullName} placeholder="Full Name" />
                                <button type="submit" onClick={handleRegister}>Register</button>
                            </form>
                        </div>
                        <p>{response}</p>
                    </>
                ) : (
                    navigate("/login")
                   )
                }
            </>
           
        
    );
};
export default Register;