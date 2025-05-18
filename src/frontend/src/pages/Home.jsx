import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import userService from '../services/user.service.js';
import { useState, useEffect } from 'react';
import problemService from '../services/problem.service.js';
import Header from './Header.jsx';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [response, setResponse] = useState([]);
    let userData = useSelector((state) => state.user.user);
    const [user, setUser] = useState(userData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await problemService.getAllProblems();
                console.log(resp.data);
                setResponse(resp.data.message);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchData();
    }, []);
    
  
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <Header />
            {/* Main Content */}
           
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-bold text-gray-800">Problems</h1>
                            <div className="flex space-x-2">
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                                    Lists
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                                    Tags
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Problems Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acceptance
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {response.length > 0 ? (
                                    response.map((problem, i) => (
                                        <tr key={i} className="hover:bg-gray-50 cursor-pointer" onClick={() =>{ user?(navigate(`/${problem.problemId}`)):(navigate('/login'))}}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                                                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {problem.difficulty || 'Medium'}
                                                </span>
                                            </td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {problem.acceptance || '45.2%'}
                                            </td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                            Loading problems...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;