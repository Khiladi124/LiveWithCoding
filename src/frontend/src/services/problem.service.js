import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL + "/api/v1/problems";
const getAllProblems = async () => {
    const problems=await axios.get(`${API_URL}/getproblem`);
    return problems;
};

const getProblemById = async (problemId) => {
    console.log(problemId);
    problemId=problemId.trim();
    const problem=await axios.get(`${API_URL}/getproblem/${problemId}`);
    return problem;
};

const updateProblem = async (problemId, problemData) => {
    const updatedProblem=await axios.put(`${API_URL}/updateproblem/${problemId}`, problemData);
    return updatedProblem;
};

const problemService = {
    getAllProblems,
    getProblemById,
    updateProblem,
};

export default problemService;