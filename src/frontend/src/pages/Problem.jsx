import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import problemService from '../services/problem.service';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
const Problem = () => {
  const { problemId } = useParams();
  const dispatch = useDispatch();
  const [problem, setProblem] = useState(null);
  const navigate = useNavigate();
  const codeContent = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (problemId) {
          const prblm = await problemService.getProblemById(problemId);
          console.log(prblm);
          setProblem(prblm.data.message);
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchData();
  }, [problemId]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-bold text-lg text-gray-800 mr-4">LiveCoding</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-800 text-sm" onClick={()=>{navigate('/')}}>Problems</a>
            <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">Contest</a>
            <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">Discuss</a>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">Premium</button>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-gray-200">
          {/* Problem Header */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
            <div className="flex items-center text-sm">
              <span className="font-medium">{problem?.title || "Loading..."}</span>
            </div>
            <div className="flex items-center space-x-2">
              {problem && (
                <span className={`text-xs px-2 py-1 rounded ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {problem.difficulty}
                </span>
              )}
            </div>
          </div>

          {/* Problem Description Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 text-sm border-b-2 border-gray-800 font-medium">
              Description
            </button>
            <button className="px-4 py-2 text-sm text-gray-500">
              Solution
            </button>
            <button className="px-4 py-2 text-sm text-gray-500">
              Discuss
            </button>
          </div>

          {/* Problem Content Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {problem ? (
              <div>
                <div className="mb-4">
                  <h1 className="text-xl font-bold text-gray-800">{problem.title}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {problem.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700">{problem.description}</p>
                </div>
                
                <div className="mb-4">
                  <h2 className="text-md font-semibold text-gray-800 mb-2">Constraints</h2>
                  <p className="text-gray-700 whitespace-pre-line text-sm">{problem.constraints}</p>
                </div>
                
                <div>
                  <h2 className="text-md font-semibold text-gray-800 mb-2">Examples</h2>
                  {problem.sampleTestCases.map((testCase, i) => (
                    <div key={i} className="mb-4">
                      <div className="text-sm text-gray-800 mb-1">Example {i + 1}:</div>
                      <div className="bg-gray-50 p-3 rounded-lg mb-2">
                        <div className="mb-2">
                          <div className="text-xs text-gray-600">Input:</div>
                          <pre className="bg-gray-100 p-2 rounded text-sm font-mono overflow-auto">{testCase.input}</pre>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Output:</div>
                          <pre className="bg-gray-100 p-2 rounded text-sm font-mono overflow-auto">{testCase.output}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading problem details...</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Editor Controls */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <div className="flex items-center">
              <select className="text-sm mr-2 border border-gray-300 rounded px-2 py-1">
               
                <option>C++</option>
                <option>Python</option>
                <option>JavaScript</option>
                <option>Java</option>
                
                
                
              </select>
            </div>
            <div className="flex space-x-2">
              <button className="text-sm bg-white border border-gray-300 rounded px-2 py-1" onClick={()=>{codeContent.current.value="";}}>
                Reset
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <textarea
              className="w-full h-full bg-gray-900 text-gray-200 p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your code here..."
              spellCheck="false"
              ref={codeContent}
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
            <button className="px-3 py-1.5 text-sm bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
              Run
            </button>
            <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;