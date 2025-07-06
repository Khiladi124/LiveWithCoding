import React, { useEffect } from 'react';
import {useState} from 'react';
import problemService from '../services/problem.service';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const AddTestCase = () => {
    const navigate = useNavigate();
    const { problemId } = useParams();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await problemService.getProblemById(problemId);
                console.log(response);
                setProblem(response.data.message);      

        } catch (error) {
                
                console.error("Error fetching problem:", error);
                alert("Error fetching problem. Please try again later.");
                navigate('/'); // Redirect to home or another page on error
            }
        };
        fetchProblem();
    }, [problemId, navigate]);
    
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const testCase = await problemService.addTestCase({
            "input": input,
            "output": output
        }, problemId);
        console.log(testCase);
        if(testCase.status === 201) {
            console.log("Test case added successfully");
            alert("Test case added successfully");
        }
        setInput('');
        setOutput('');
    }   

    return (
        <>
        
       {
        problemId && problem && (
    <div>
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className=" text-3xl text-center font-bold text-gray-800">{`${problem.title}`}</h1>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                    <h1 className="text-xl font-bold text-gray-800">Add Test Case</h1>
                    
                </div>
                <div className="p-6">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="input" className="block text-sm font-medium text-gray-700">Input</label>
                            <textarea id="input" rows="4" onChange={(e) => setInput(e.target.value)}  value={input} placeholder='type the input....' className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="output" className="block text-sm font-medium text-gray-700">Output</label>
                            <textarea id="output" rows="4" onChange={(e) => setOutput(e.target.value)} value={output} placeholder='type the output....' className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                        </div>
                        {/* <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Add Test Case</button> */}
                    </form>
                    <button type="submit"className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-4' onClick={handleSubmit}> 
                        Submit
                     </button>
                </div>
            </div>
        </div>
    </div>
        )
    }
         </>
    );
};

export default AddTestCase;

   