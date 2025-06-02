import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import problemService from '../services/problem.service';
import Editor from '@monaco-editor/react';
import Header from './Header';
import getAIReview from '../services/aiReview.service';

const Problem = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [currLanguage, setCurrLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState("");
  const [AIOutput, setAIOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(''); // 'run', 'submit', 'ai-review'
  const [activeTab, setActiveTab] = useState('input');
  const [showAIModal, setShowAIModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (problemId) {
          const prblm = await problemService.getProblemById(problemId);
          setProblem(prblm.data.message);
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
        if (error.response && error.response.status === 401) {
          // JWT token expired or invalid, redirect to login
          window.location.href = '/login';
        }
      }
    };
    fetchData();
  }, [problemId]);
  const handleSubmit = async () => {
    setOutput("");
    setIsLoading(true);
    setLoadingType('submit');
    try {
      const arg = {
        "lang": currLanguage,
        "problemId": problemId,
        "code": code,
      }
      const response = await problemService.submitProblem(arg);
      console.log("Response from submitProblem:", response);
      if (response.status !== 200) {
        setOutput(response.response.data.data);
      } else {
        setOutput(response.data.message.output);
      }
      setActiveTab('output');
    } catch (e) {
      console.log("error while submitting code", e);
    } finally {
      setIsLoading(false);
      setLoadingType('');
    }
  };

  const handleRun = async () => {
    setOutput("");
    setIsLoading(true);
    setLoadingType('run');
    try {
      const response = await problemService.runProblem({
        "lang": currLanguage,
        "problemId": problemId,
        "code": code,
        "input": input
      });
      
      if (response.status === 201) {
        setOutput(response.data.message.output);
      } else {
        setOutput(response.data.data);
      }
      setActiveTab('output');
    } catch (error) {
      console.error("Error running code:", error);
    } finally {
      setIsLoading(false);
      setLoadingType('');
    }
  };

  const handleAIReview = async (e) => {
    e.preventDefault();
    setAIOutput("");
    setIsLoading(true);
    setLoadingType('ai-review');
    setShowAIModal(true);
    try {
      const response = await getAIReview(problemId, code);
      if (response.status === 200) {
        setAIOutput(response.data.message.response);
      } else {
        setAIOutput("Error fetching AI review: " + response.data.data);
      }
    } catch (error) {
      console.error("Error fetching AI review:", error);
      setAIOutput("Error fetching AI review: " + error.message);
    } finally {
      setIsLoading(false);
      setLoadingType('');
    }
  };

  const closeAIModal = () => {
    setShowAIModal(false);
    setAIOutput(null);
  };



  const handleChange = (value) => {
    setCode(value);
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const LoadingSpinner = ({ type }) => {
    const getLoadingText = () => {
      switch (type) {
        case 'run': return 'Running code...';
        case 'submit': return 'Submitting solution...';
        case 'ai-review': return 'AI is analyzing your code...';
        default: return 'Processing...';
      }
    };

    const getSpinnerColor = () => {
      switch (type) {
        case 'run': return 'border-blue-600';
        case 'submit': return 'border-emerald-600';
        case 'ai-review': return 'border-purple-600';
        default: return 'border-indigo-600';
      }
    };

    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative">
          <div className={`animate-spin rounded-full h-8 w-8 border-2 border-gray-200 ${getSpinnerColor()} border-t-transparent`}></div>
          <div className={`absolute inset-0 rounded-full h-8 w-8 border-2 border-transparent ${getSpinnerColor().replace('border-', 'border-t-')} animate-pulse`}></div>
        </div>
        <div className="mt-3 flex items-center space-x-1">
          <span className="text-sm text-slate-600">{getLoadingText()}</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Header />

      <div className={`flex flex-1 overflow-hidden relative z-10 ${showAIModal ? 'filter blur-sm' : ''}`}>
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-xl">
          {/* Problem Header */}
          <div className="px-6 py-5 border-b border-slate-200/50 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-slate-800 mb-2">
                  {problem?.title || "Loading..."}
                </h1>
                {problem && (
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficultyLevel)}`}>
                      {problem.difficultyLevel}
                    </span>
                    <div className="flex gap-1">
                      {problem.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-slate-100/80 text-slate-700 border border-slate-200/50 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                      {problem.tags.length > 3 && (
                        <span className="text-xs text-slate-500">+{problem.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Problem Content */}
          <div className="flex-1 overflow-y-auto">
            {problem ? (
              <div className="p-6 space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed">{problem.description}</p>
                </div>

                <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200/50 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Constraints
                  </h3>
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono bg-white/80 p-3 rounded border border-slate-200/50 backdrop-blur-sm">
                    {problem.constraints}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Examples
                  </h3>
                  <div className="space-y-4">
                    {problem.sampleTestCases.map((testCase, i) => (
                      <div key={i} className="border border-slate-200/50 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-sm">
                        <div className="bg-slate-50/80 px-4 py-2 border-b border-slate-200/50">
                          <span className="text-sm font-medium text-slate-700">Example {i + 1}</span>
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Input</label>
                            <pre className="mt-1 bg-slate-100/80 p-3 rounded text-sm font-mono text-slate-800 border border-slate-200/50 backdrop-blur-sm">
                              {testCase.input}
                            </pre>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Output</label>
                            <pre className="mt-1 bg-slate-100/80 p-3 rounded text-sm font-mono text-slate-800 border border-slate-200/50 backdrop-blur-sm">
                              {testCase.output}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-indigo-600 mx-auto"></div>
                    <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-indigo-400 animate-pulse mx-auto"></div>
                  </div>
                  <p className="mt-4 text-slate-500 animate-pulse">Loading problem details...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col bg-slate-900/95 backdrop-blur-sm shadow-xl">
          {/* Editor Header */}
          <div className="bg-slate-800/95 backdrop-blur-sm px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select 
                  className="bg-slate-700/90 text-white text-sm border border-slate-600/50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 backdrop-blur-sm" 
                  onChange={(e) => setCurrLanguage(e.target.value.toLowerCase())}
                  value={currLanguage}
                >
                  <option value="cpp">C++</option>
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                </select>
              </div>
              <button 
                className="text-sm bg-slate-700/90 hover:bg-slate-600/90 text-white border border-slate-600/50 rounded-lg px-4 py-2 transition-colors duration-200 backdrop-blur-sm"
                onClick={() => setCode("")}
              >
                Reset Code
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              theme="vs-dark"
              language={currLanguage}
              defaultValue="// Write your solution here"
              value={code}
              onChange={handleChange}
              rows={20}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                bracketPairColorization: { enabled: true },
                
              }}
            />
          </div>

          {/* Bottom Panel */}
          <div className="bg-white/95 backdrop-blur-sm border-t border-slate-200/50 shadow-lg">
            {/* Action Buttons */}
            <div className="px-6 py-4 border-b border-slate-200/50">
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <button 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
                    onClick={handleRun}
                    disabled={isLoading}
                  >
                    {isLoading && loadingType === 'run' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Running...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M10 6V4a2 2 0 012-2h0a2 2 0 012 2v2M7 8a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8z" />
                        </svg>
                        Run
                      </>
                    )}
                  </button>
                  <button 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading && loadingType === 'submit' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit
                      </>
                    )}
                  </button>
                  <button 
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
                    onClick={handleAIReview}
                    disabled={isLoading}
                  >
                    {isLoading && loadingType === 'ai-review' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        AI Review
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6">
              <div className="flex space-x-1 border-b border-slate-200/50">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                    activeTab === 'input' 
                      ? 'bg-indigo-50/80 text-indigo-700 border-b-2 border-indigo-600 backdrop-blur-sm' 
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50/50'
                  }`}
                  onClick={() => setActiveTab('input')}
                >
                  Input
                </button>
                {output && (
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                      activeTab === 'output' 
                        ? 'bg-emerald-50/80 text-emerald-700 border-b-2 border-emerald-600 backdrop-blur-sm' 
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50/50'
                    }`}
                    onClick={() => setActiveTab('output')}
                  >
                    Output
                  </button>
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'input' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Test Input</label>
                  <textarea
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full border border-slate-300/50 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm p-3 font-mono bg-white/80 backdrop-blur-sm"
                    placeholder="Enter your test input here..."
                  />
                </div>
              )}

              {activeTab === 'output' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Output</label>
                  {isLoading && loadingType === 'run' || isLoading && loadingType === 'submit' ? (
                    <LoadingSpinner type={loadingType} />
                  ) : output ? (
                    <textarea
                      rows="3"
                      readOnly
                      value={output}
                      className="w-full border border-slate-300/50 rounded-lg bg-slate-50/80 text-sm p-3 font-mono resize-none backdrop-blur-sm"
                    />
                  ) : (
                    <div className="w-full border border-slate-300/50 rounded-lg bg-slate-50/80 text-sm p-3 text-slate-500 italic backdrop-blur-sm">
                      No output yet. Run your code to see results.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Review Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-slate-200/50">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Code Review
                </h3>
                <button
                  onClick={closeAIModal}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              {isLoading && loadingType === 'ai-review' ? (
                <LoadingSpinner type={loadingType} />
              ) : AIOutput ? (
                <div className="prose prose-slate max-w-none">
                  <pre className="whitespace-pre-wrap text-slate-700 bg-slate-50/80 p-4 rounded-lg border border-slate-200/50 text-sm leading-relaxed backdrop-blur-sm">
                    <ReactMarkdown
                      children={AIOutput}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    />
                    
                  </pre>
                </div>
              ) : (
                <div className="text-center text-slate-500 py-8">
                  <svg className="w-12 h-12 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  No AI review available yet.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-200/50 backdrop-blur-sm">
              <div className="flex justify-end">
                <button
                  onClick={closeAIModal}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white/80 border border-slate-300/50 rounded-lg hover:bg-slate-50/80 transition-colors duration-200 backdrop-blur-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem;