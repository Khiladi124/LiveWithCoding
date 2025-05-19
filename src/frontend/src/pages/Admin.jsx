import React, { use } from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import problemService from "../services/problem.service";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [testCases, setTestCases] = useState([]);
    const user = useSelector((state) => state.user.user);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    // Form refs
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const constraintsRef = useRef(null);
    const tagsRef = useRef(null);
    const difficultyRef = useRef(null);
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const explanationRef = useRef(null);
    // Check if user is verified
    useEffect(() => {

    if (user && user.isVerified) {
        setAdmin(true);
    } else {
        navigate('/');
        return;
    }
    console.log(user);
    }, [user]);
    
    // Test case form refs - will be updated for each test case
   
    
    const AddTestCase = () => {
        const handleTestCaseSubmit = (e) => {
            e.preventDefault();
            
            const newTestCase = {
                // Use timestamp as a unique ID
                input: inputRef.current.value,
                output: outputRef.current.value,
                explanation: explanationRef.current.value || null,
            };
            
            setTestCases([...testCases, newTestCase]);
            console.log(newTestCase);
            
            // Clear form fields
            inputRef.current.value = "";
            outputRef.current.value = "";
            explanationRef.current.value = "";
        };
        
        return (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Case {testCases.length + 1}</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                        <textarea 
                            id="input" 
                            name="input" 
                            ref={inputRef} 
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div>
                        <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-1">Output</label>
                        <textarea 
                            id="output" 
                            name="output" 
                            ref={outputRef} 
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div>
                        <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                        <textarea 
                            id="explanation" 
                            name="explanation" 
                            ref={explanationRef}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="2"
                        ></textarea>
                    </div>
                    
                    <button 
                        type="button" 
                        onClick={handleTestCaseSubmit}
                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add Test Case
                    </button>
                </div>
            </div>
        );
    };
    
    const submitQ = async (e) => {
        e.preventDefault(); 
        console.log("Submitting problem...",user);
        if(admin === false) {
            alert("You are not authorized to add problems");
            return;
        }
        
        const problem = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            constraints: constraintsRef.current.value,
            tags: tagsRef.current.value,
            difficulty: difficultyRef.current.value,
            sampleTestCases: testCases
        };
        
        console.log(problem);
        
        try {
            const response = await problemService.addProblem(problem);
            console.log(response);
            if (response.status < 300) {
                // Reset form fields
                titleRef.current.value = "";
                descriptionRef.current.value = "";
                constraintsRef.current.value = "";
                tagsRef.current.value = "";
                difficultyRef.current.value = "";
                setTestCases([]);
                inputRef.current.value = "";
                outputRef.current.value = "";
                explanationRef.current.value = "";
                // Show success message
                alert("Problem added successfully");
            } else {
                alert("Error adding problem");
            }
        } catch (error) {
            console.error("Error adding problem:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Problem</h1>
            
            {/* Main problem form */}
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            ref={titleRef} 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            ref={descriptionRef} 
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="5"
                        ></textarea>
                    </div>
                    
                    <div>
                        <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-1">Constraints</label>
                        <textarea 
                            id="constraints" 
                            name="constraints" 
                            ref={constraintsRef} 
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <input 
                            type="text" 
                            id="tags" 
                            name="tags" 
                            ref={tagsRef} 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                        <select 
                            id="difficulty" 
                            name="difficulty" 
                            ref={difficultyRef} 
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
            </div>
            
            {/* Display already added test cases */}
            {testCases.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Added Test Cases</h2>
                    <div className="space-y-4">
                        {testCases.map((tc, index) => (
                            <div key={tc.id} className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm">
                                <h3 className="font-medium text-gray-700 mb-2">Test Case {index + 1}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <span className="block text-sm font-medium text-gray-500 mb-1">Input:</span>
                                        <pre className="whitespace-pre-wrap text-sm">{tc.input}</pre>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <span className="block text-sm font-medium text-gray-500 mb-1">Output:</span>
                                        <pre className="whitespace-pre-wrap text-sm">{tc.output}</pre>
                                    </div>
                                    {tc.explanation && (
                                        <div className="bg-white p-3 rounded border border-gray-200 md:col-span-2">
                                            <span className="block text-sm font-medium text-gray-500 mb-1">Explanation:</span>
                                            <pre className="whitespace-pre-wrap text-sm">{tc.explanation}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Add test case component */}
            <AddTestCase />
            
            {/* Submit button */}
            <div className="mt-8 flex justify-end">
                <button 
                    type="submit" 
                    onClick={submitQ}
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Submit Problem
                </button>
            </div>
        </div>
    );
};

export default Admin;