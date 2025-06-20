import axios from 'axios';
const API_URL =`${import.meta.env.VITE_API_URL}/api/v1/gemini`;

const getAIReview=async(problemId,code)=>{
    try {
        const response = await axios.post(`${API_URL}/${problemId}/getReview`, { code },
            {
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        console.error("Error getting AI review:", error);
        throw error;
    }
};

export default getAIReview;