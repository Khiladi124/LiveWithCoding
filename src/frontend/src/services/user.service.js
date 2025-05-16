import axios from "axios";

// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL + "/api/v1/users"; // TODO: TEST

const register = (fullname, username, email, password) => {
    console.log("Registering user with email:");
    return axios.post(`${API_URL}/register`, {
        email,
        username,
        password,
        fullname
    });
};

const login = (email, password) => {
    console.log("Logging in user with email: called userservice");
    console.log("Logging in user with email: " + email + " " + password); // DEBUGGING
    email = email.trim();
    password = password.trim();
    return axios.post(`${API_URL}/login`, {
        email,
        password
    });
};


const logout = () => {
    return axios.post(`${API_URL}/logout`);
};

const getUser = () => {
    return axios.get(`${API_URL}/getUser`);
};
const userService = {
    register,
    login,
    logout,
    getUser
};
export default userService;