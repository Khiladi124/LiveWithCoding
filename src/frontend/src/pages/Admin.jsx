import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import problemService from "../services/problem.service";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [testCases, setTestCases] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState("");
    let userData = useSelector((state) => state.user.user);
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Form refs
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const constraintsRef = useRef(null);
    const difficultyRef = useRef(null);
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const explanationRef = useRef(null);


    useEffect(() => {
        
        
        if (userData?.isVerified===true) {
            console.log("admin",userData);
            setUser(userData);
            setAdmin(true);
        } else {
            navigate('/');
            return;
        }
        console.log(user);
    }, [user, userData, admin]);

    // Tag management functions
    const addTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim().toLowerCase())) {
            setTags([...tags, currentTag.trim().toLowerCase()]);
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleTagInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };
    
    const AddTestCase = () => {
        const handleTestCaseSubmit = (e) => {
            e.preventDefault();
            
            const newTestCase = {
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
            <div className="mt-10">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{testCases.length + 1}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Add Test Case</h2>
                    </div>
                    
                    <div className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="input" className="block text-sm font-semibold text-gray-700">
                                    Input <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="input" 
                                    name="input" 
                                    ref={inputRef} 
                                    required
                                    placeholder="Enter test case input..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                    rows="4"
                                ></textarea>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="output" className="block text-sm font-semibold text-gray-700">
                                    Expected Output <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="output" 
                                    name="output" 
                                    ref={outputRef} 
                                    required
                                    placeholder="Enter expected output..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="explanation" className="block text-sm font-semibold text-gray-700">
                                Explanation (Optional)
                            </label>
                            <textarea 
                                id="explanation" 
                                name="explanation" 
                                ref={explanationRef}
                                placeholder="Explain the test case logic..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                rows="3"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="button" 
                            onClick={handleTestCaseSubmit}
                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            Add Test Case
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    const submitQ = async (e) => {
        e.preventDefault(); 
        setIsSubmitting(true);
        console.log("Submitting problem...", user);
        
        if(admin === false) {
            alert("You are not authorized to add problems");
            setIsSubmitting(false);
            return;
        }
        
        const problem = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            constraints: constraintsRef.current.value,
            tags: tags, // Now sending array of tags
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
                setTags([]); // Reset tags array
                setCurrentTag(""); // Reset current tag input
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
        } finally {
            setIsSubmitting(false);
        }
    };

    const removeCaseItem = (index) => {
        setTestCases(testCases.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Create New Problem
                    </h1>
                    <p className="text-gray-600 text-lg">Design challenging problems for the coding community</p>
                </div>
                
                {/* Main problem form */}
                <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 mb-10">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                Problem Title <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                ref={titleRef} 
                                required 
                                placeholder="Enter a descriptive problem title..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                Problem Description <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                id="description" 
                                name="description" 
                                ref={descriptionRef} 
                                required
                                placeholder="Describe the problem in detail. Include examples and expected behavior..."
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                rows="6"
                            ></textarea>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="constraints" className="block text-sm font-semibold text-gray-700">
                                    Constraints <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    id="constraints" 
                                    name="constraints" 
                                    ref={constraintsRef} 
                                    required
                                    placeholder="List the problem constraints..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                                    rows="4"
                                ></textarea>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="tags" className="block text-sm font-semibold text-gray-700">
                                        Tags <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            id="tags" 
                                            value={currentTag}
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            onKeyPress={handleTagInputKeyPress}
                                            placeholder="e.g., array, sorting, dynamic-programming"
                                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={addTag}
                                            className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    
                                    {/* Display added tags */}
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                                >
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTag(tag)}
                                                        className="text-blue-600 hover:text-blue-800 font-bold"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700">
                                        Difficulty Level <span className="text-red-500">*</span>
                                    </label>
                                    <select 
                                        id="difficulty" 
                                        name="difficulty" 
                                        ref={difficultyRef} 
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    >
                                        <option value="">Select Difficulty</option>
                                        <option value="easy">🟢 Easy</option>
                                        <option value="medium">🟡 Medium</option>
                                        <option value="hard">🔴 Hard</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Display already added test cases */}
                {testCases.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Test Cases Preview</h2>
                        <div className="grid gap-6">
                            {testCases.map((tc, index) => (
                                <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                            <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {index + 1}
                                            </span>
                                            Test Case {index + 1}
                                        </h3>
                                        <button
                                            onClick={() => removeCaseItem(index)}
                                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                            <span className="block text-sm font-bold text-blue-700 mb-2">Input:</span>
                                            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">{tc.input}</pre>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                            <span className="block text-sm font-bold text-green-700 mb-2">Output:</span>
                                            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">{tc.output}</pre>
                                        </div>
                                        {tc.explanation && (
                                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 lg:col-span-2">
                                                <span className="block text-sm font-bold text-yellow-700 mb-2">Explanation:</span>
                                                <pre className="whitespace-pre-wrap text-sm text-gray-800">{tc.explanation}</pre>
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
                <div className="mt-12 flex justify-center">
                    <button 
                        type="submit" 
                        onClick={submitQ}
                        disabled={isSubmitting}
                        className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-all duration-200 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Publishing Problem...
                            </span>
                        ) : (
                            '🚀 Publish Problem'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;