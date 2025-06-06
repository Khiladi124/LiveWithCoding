import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import problemService from '../services/problem.service.js';
import Header from './Header.jsx';


const Home = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.user);
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("home" ,userData)
        setUser(userData);
        console.log("home" ,user);
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const resp = await problemService.getAllProblems();
                setResponse(resp.data.message);
            } catch (error) {
                console.error("Error fetching problems:", error);
            } 
               
            
            setLoading(false);
            
        };
        fetchData();
      
    }, [userData, user]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'medium':
                return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'hard':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [filteredProblems, setFilteredProblems] = useState([]);

    useEffect(() => {
        let filtered = response;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(problem =>
                problem.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Difficulty filter
        if (selectedDifficulty) {
            filtered = filtered.filter(problem =>
                problem.difficultyLevel === selectedDifficulty
            );
        }

        // Tag filter
        if (selectedTag) {
            filtered = filtered.filter(problem =>
                problem.tags && problem.tags.includes(selectedTag)
            );
        }

        setFilteredProblems(filtered);
    }, [response, searchTerm, selectedDifficulty, selectedTag]);

    const getTagColor = (index) => {
        const colors = [
            'bg-emerald-50 text-emerald-700 border-emerald-200',
            'bg-teal-50 text-teal-700 border-teal-200',
            'bg-blue-50 text-blue-700 border-blue-200',
            'bg-indigo-50 text-indigo-700 border-indigo-200',
            'bg-purple-50 text-purple-700 border-purple-200',
            'bg-gray-50 text-gray-700 border-gray-200',
        ];
        return colors[index % colors.length];
    };

    const getAllTags = () => {
    const tags = new Set();
    response.forEach(problem => {
        if (problem.tags) {
            problem.tags.forEach(tag => tags.add(tag));
        }
    });
    return Array.from(tags).sort(); // Added sort for better UX
};

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-green-400/8 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-4 h-4 bg-emerald-400/15 rounded-full animate-float"></div>
                <div className="absolute top-40 right-32 w-6 h-6 bg-teal-400/15 rotate-45 animate-float delay-300"></div>
                <div className="absolute bottom-40 left-32 w-5 h-5 bg-green-400/15 rounded-full animate-float delay-700"></div>
                <div className="absolute top-60 left-1/3 w-3 h-3 bg-emerald-400/15 rotate-45 animate-float delay-1000"></div>
            </div>

            <Header />
            
            <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-emerald-700 bg-clip-text text-transparent mb-2">
                        Coding Problems
                    </h1>
                    <p className="text-gray-600">Challenge yourself with our curated collection of problems</p>
                </div>

                <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-emerald-200/30 overflow-hidden">
                    {/* Header Section with Filters */}
                    <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm border-b border-emerald-200/30 px-8 py-6">
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-8 bg-gradient-to-b from-emerald-600 to-teal-700 rounded-full shadow-lg"></div>
                                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-emerald-700 bg-clip-text text-transparent">
                                        Problems
                                    </h2>
                                </div>
                               
                            </div>
                            
                            {/* Search and Filter Bar */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="flex-1 relative">
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search problems..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white/90 border border-emerald-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                                    />
                                </div>
                                
                                {/* Difficulty Filter */}
                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                    className="px-4 py-2 bg-white/90 border border-emerald-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                                >
                                    <option value="">All Difficulties</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                                
                                {/* Tag Filter */}
                                <select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="px-4 py-2 bg-white/90 border border-emerald-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                                >
                                    <option value="">All Tags</option>
                                    {getAllTags().map((tag, index) => (
                                        <option key={index} value={tag}>{tag}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-emerald-50/90 to-teal-50/90 backdrop-blur-sm">
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                        Tags
                                    </th>
                                    <th className="px-8 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-100/60">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center space-y-4">
                                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
                                                <p className="text-emerald-600">Loading problems...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredProblems && filteredProblems.length > 0 ? (
                                    filteredProblems.map((problem, i) => (
                                        <tr 
                                            key={i} 
                                            className="hover:bg-gradient-to-r hover:from-emerald-50/60 hover:to-teal-50/60 cursor-pointer transition-all duration-200 group backdrop-blur-sm"
                                            onClick={() =>  navigate(`/${problem.problemId}`) }
                                        >
                                            <td className="px-8 py-6">
                                                <div className="w-6 h-6 rounded-full border-2 border-emerald-300 group-hover:border-emerald-500 transition-colors duration-200 flex items-center justify-center">
                                                    {
                                                    user && user.problemSolved.includes(problem.problemId) ?
                                                    (
                                                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : null
                                                   }
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors duration-200">
                                                    {problem.title}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {problem.tags && problem.tags.length > 0 ? (
                                                        problem.tags.slice(0, 3).map((tag, tagIndex) => (
                                                            <span 
                                                                key={tagIndex}
                                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(tagIndex)}`}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">No tags</span>
                                                    )}
                                                    {problem.tags && problem.tags.length > 3 && (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600 border border-emerald-200">
                                                            +{problem.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center px-5 py-1.5 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficultyLevel)}`}>
                                                    {problem.difficultyLevel}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-16 text-center">
                                            <div className="flex flex-col items-center space-y-4">
                                                <svg className="w-16 h-16 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No problems found</h3>
                                                    <p className="text-gray-500">Try adjusting your filters or search term</p>
                                                </div>
                                            </div>
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