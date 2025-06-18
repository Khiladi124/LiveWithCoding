import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/linkedin';

 const linkedinBot = async (req)=>{
    const { email, password, companyName, messageText } = req;
    console.log("linkedinBot service called with:", { email, password, companyName, messageText });
    const response = await axios.post(`${API_BASE_URL}/runLinkedinBot`, {
        email,
        password,
        companyName,
        messageText
    });
    console.log("Response from LinkedIn Bot service:", response);
    return response.data;

}

const linkedinBotServices = {
    linkedinBot
};
export default linkedinBotServices;