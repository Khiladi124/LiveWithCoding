import axios from "axios";

// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL + "/api/v1/users"; // TODO: TEST

const register = async (fullname, username, email, password) => {
    console.log("Registering user with email:");
    const resp= await axios.post(`${API_URL}/register`, {
        email,
        username,
        password,
        fullname
    });
    return resp;
};

const login =async (email, password) => {
    // console.log("Logging in user with email: called userservice");
    console.log("Logging in user with email: " + email + " " + password); // DEBUGGING
    email = email.trim();
    password = password.trim();
    const resp=await axios.post(`${API_URL}/login`, {
        email,
        password
    });
    return resp;
};


const logout = async (user) => {
     console.log("Logging out user with email: " + user._id); // DEBUGGING
    const resp= await axios.post(`${API_URL}/logout`,{
        user
    },{withCredentials: true})
    return resp;
};

const getUser = async () => {
    const resp= await axios.get(`${API_URL}/getUser`);
    return resp;
};
const userService = {
    register,
    login,
    logout,
    getUser
};
export default userService;