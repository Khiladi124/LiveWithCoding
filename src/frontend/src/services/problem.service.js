import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL + "/api/v1/problems";
const getAllProblems = async () => {
    const problems=await axios.get(`${API_URL}/getproblem`);
    return problems;
};
const submitProblem = async (req) => {
    try{
        const {problemId,lang,code}=req;
        console.log(problemId,lang,code,req);
        const response=await axios.post(`${API_URL}/getproblem/${problemId}/submit`,req,{
            withCredentials: true,
        });
        //  console.log(response);
        return response;
    }catch(e){
        console.log("error while submitting code",e);
        return e;
    }
   
   
    
}
const runProblem=async(req)=>{
    try{
        const {problemId}=req;
        console.log(req);
       const response=await axios.post(`${API_URL}/getproblem/${problemId}/run`,req,{
              withCredentials: true,
       });
       // console.log(response);
       
       return response;
    } catch(e){
        return e;
    }
    
}


const getProblemById = async (problemId) => {
    console.log(problemId);
    problemId=problemId.trim();
    const problem=await axios.get(`${API_URL}/getproblem/${problemId}`);
    return problem;
};

const updateProblem = async (problemId, problemData) => {
    const updatedProblem=await axios.put(`${API_URL}/updateproblem/${problemId}`, problemData,{
        withCredentials: true,
    });
    return updatedProblem;
};
const addProblem = async (problemData) => {
    const newProblem=await axios.post(`${API_URL}/addproblem`, problemData,{
        withCredentials: true,
    });
    return newProblem;
}
const addTestCase = async ( testCaseData,problemId) => {
    console.log("Adding test case for problem ID:", problemId);
    if(!problemId || !testCaseData) {
        throw new Error("Problem ID and test case data are required");
    }
    console.log("Adding test case for problem ID:", problemId);
    console.log("Test case data:", testCaseData);
    const newTestCase = await axios.post(`${API_URL}/getproblem/${problemId}/addtestcase`, testCaseData,{
        withCredentials: true,
    });
    return newTestCase;
}


const problemService = {
    getAllProblems,
    getProblemById,
    updateProblem,
    addProblem,
    submitProblem,
    runProblem,
    addTestCase,
    
};

export default problemService;