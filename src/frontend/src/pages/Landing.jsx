import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';

const Landing = () => {
    const navigate = useNavigate();

    const handleStartCoding = () => {
        navigate('/home');
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
            <Header/>
            {/* Hero Section */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/30 to-slate-100/30"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                                    JioWithCoding
                                </span>
                            </h1>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                Master Data Structures & Algorithms with structured practice, intelligent progress tracking, and elevate your coding journey
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button 
                                    onClick={handleStartCoding}
                                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/30 border border-emerald-400/30"
                                >
                                    Start Coding
                                </button>
                                <button className="px-8 py-4 bg-transparent border-2 border-gray-800 text-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white hover:border-gray-900 transform hover:scale-105 transition-all duration-300 shadow-md backdrop-blur-sm">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex justify-center lg:justify-end">
                            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 max-w-md w-full border border-gray-200 hover:border-gray-300 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <div className="ml-auto text-gray-600 text-xs">code.js</div>
                                </div>
                                <div className="space-y-4 font-mono text-sm">
                                    <div className="text-gray-800">
                                        <span className="text-emerald-600">function</span> 
                                        <span className="text-green-700"> binarySearch</span>
                                        <span className="text-gray-900">(arr, target) {}</span>
                                    </div>
                                    <div className="text-gray-700 pl-4">
                                        <span className="text-emerald-600">let</span> 
                                        <span className="text-gray-900"> left = 0, right = arr.length;</span>
                                    </div>
                                    <div className="text-gray-700 pl-4">
                                        <span className="text-emerald-600">return</span> 
                                        <span className="text-green-700"> optimizedSolution</span>
                                        <span className="text-gray-900">;</span>
                                    </div>
                                    <div className="text-gray-900 pl-0"></div>
                                    <div className="text-gray-600 italic">
                                        // Time: O(log n) | Space: O(1) 🎯
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-gradient-to-r from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">
                            Built for Coding Excellence
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Essential tools and features designed to accelerate your coding journey and ace technical interviews
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 group hover:transform hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl mb-6 flex items-center justify-center shadow-md group-hover:shadow-emerald-500/30 transition-all duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Learning</h3>
                            <p className="text-gray-700 leading-relaxed">Optimized learning paths with adaptive difficulty for quick concept mastery and retention</p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 group hover:transform hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-6 flex items-center justify-center shadow-md group-hover:shadow-green-500/30 transition-all duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
                            <p className="text-gray-700 leading-relaxed">Advanced progress tracking with detailed insights into your solving patterns and improvement areas</p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-3xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 group hover:transform hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/20">
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl mb-6 flex items-center justify-center shadow-md group-hover:shadow-teal-500/30 transition-all duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interview Ready</h3>
                            <p className="text-gray-700 leading-relaxed">Curated problems from FAANG companies with real interview scenarios and detailed solutions</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-green-900/20"></div>
                <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                        Ready to Transform Your 
                        <span className="block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                            Coding Journey?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of successful developers who elevated their skills and landed dream jobs with JioWithCoding
                    </p>
                    <button 
                        onClick={handleSignUp}
                        className="px-16 py-5 bg-emerald-600 text-white font-bold text-xl rounded-full hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-emerald-600/30 border-4 border-emerald-500"
                    >
                        Join Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent mb-4">
                            JioWithCoding
                        </h3>
                        <p className="text-gray-700 text-lg">
                            &copy; 2024 JioWithCoding. Empowering coders worldwide.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
