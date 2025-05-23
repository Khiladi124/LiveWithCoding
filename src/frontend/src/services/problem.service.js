import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL + "/api/v1/problems";
const getAllProblems = async () => {
    const problems=await axios.get(`${API_URL}/getproblem`);
    return problems;
};
const submitProblem = async (req) => {
    const {problemId,lang,code}=req;
    console.log(problemId,lang,code,req);
    const response=await axios.post(`${API_URL}/getproblem/${problemId}/submit`,req);
     console.log(response);
    return response.data.message;
   
    
}
const runProblem=async(req)=>{
     const {problemId}=req;
     console.log(req);
    const response=await axios.post(`${API_URL}/getproblem/${problemId}/run`,req);
    console.log(response);
    return response.data.message;
}


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
const addProblem = async (problemData) => {
    const newProblem=await axios.post(`${API_URL}/addproblem`, problemData);
    return newProblem;
}
const problemService = {
    getAllProblems,
    getProblemById,
    updateProblem,
    addProblem,
    submitProblem,
    runProblem,
};

export default problemService;