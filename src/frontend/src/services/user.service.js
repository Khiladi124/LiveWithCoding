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
    console.log("Response from login: ", resp); // DEBUGGING
    return resp;
};


const logout = async (user) => {
     console.log("Logging out user with email: " + user._id); // DEBUGGING
    const resp= await axios.post(`${API_URL}/logout`,{
        user
    },{
        withCredentials: true
    })
    return resp;
};

const getUser = async () => {
    const resp= await axios.get(`${API_URL}/getUser`);
    return resp;
};
const resetPassword = async (email) => {
    console.log("Resetting password for email: " + email);
    const resp = await axios.post(`${API_URL}/resetPassword`, { email });
    console.log("Response from resetPassword: ", resp);
    return resp;
};
const confirmResetPassword = async (activationToken, newPassword) => {
    console.log("Confirming reset password with activationToken: " + activationToken);
    const resp = await axios.post(`${API_URL}/confirmResetPassword/${activationToken}`,{newPassword});
    console.log("Response from confirmResetPassword: ", resp);
    return resp;
};
        
const refreshToken = async (refreshToken) => {
    console.log("Refreshing token with refreshToken: " + refreshToken); // DEBUGGING    
    const resp= await axios.post(`${API_URL}/refresh`,{
        refreshToken
    },{withCredentials: true});
    console.log("Response from refreshToken: ", resp); // DEBUGGING
    return resp;
};
const verifyEmail = async(email, otp)=>{
    const resp=await axios.post(`${API_URL}/verifyOtp`,{email,otp});
    console.log(resp);
    return resp;
}
const userService = {
    register,
    login,
    logout,
    getUser,
    refreshToken,
    verifyEmail,
    resetPassword,
    confirmResetPassword,
};
export default userService;