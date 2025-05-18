import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL + "/api/v1/problems";
const getAllProblems = async () => {
    const problems=await axios.get(`${API_URL}/problems`);
    return problems;
};

const getProblemById = async (problemId) => {
    const problem=await axios.get(`${API_URL}/problems/${problemId}`);
    return problem;
};


const problemService = {
    getAllProblems,
    getProblemById
};

export default problemService;