import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import problemService from '../services/problem.service';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import Header from './Header';


const Problem = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const navigate = useNavigate();
  const [currLanguage, setCurrLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output ,setOutput]=useState("");
  const [input, setInput] = useState("");


  const handleSubmit=async ()=>{
    console.log(problemId);
    try{
      const arg={
        "lang" : currLanguage,
        "problemId" : problemId,
        "code" : code,
      }
        const response = await problemService.submitProblem(arg);
         console.log(response.data);
        setOutput(response.data);
       console.log("code submitted successfully");
    }catch(e){
         console.log("error while submitting code",e);
         return e;
    }
  };
  const handleRun = async () => {

    try {
      console.log(input);
      const response = await problemService.runProblem({
        "lang" : currLanguage,
        "problemId" : problemId,
        "code" : code,
        "input":input
      });
      console.log(response.output);
      setOutput(response.output);
    } catch (error) {
      console.error("Error running code:", error);
    }
  };

  useEffect(() => {
    // console.log(code[code]);
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
 
  const handleChange = (value) => {
    
     setCode(value);
    console.log(code);
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-gray-300 bg-white">
          {/* Problem Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
            <div className="text-lg font-semibold text-gray-800">{problem?.title || "Loading..."}</div>
            {problem && (
              <span className={`text-xs px-3 py-1 rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {problem.difficulty}
              </span>
            )}
          </div>

          {/* Problem Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {problem ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{problem.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {problem.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{problem.description}</p>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Constraints</h2>
                <p className="text-gray-700 whitespace-pre-line text-sm mb-6">{problem.constraints}</p>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Examples</h2>
                {problem.sampleTestCases.map((testCase, i) => (
                  <div key={i} className="mb-6">
                    <div className="text-sm font-medium text-gray-800 mb-2">Example {i + 1}:</div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="mb-4">
                        <div className="text-xs text-gray-600">Input:</div>
                        <pre className="bg-gray-200 p-2 rounded text-sm font-mono">{testCase.input}</pre>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Output:</div>
                        <pre className="bg-gray-200 p-2 rounded text-sm font-mono">{testCase.output}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Loading problem details...</div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col bg-gray-50">
          {/* Editor Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
            <select className="text-sm border border-gray-300 rounded px-3 py-2" onChange={(e) => setCurrLanguage(e.target.value.toLowerCase())}>
              <option>Cpp</option>
              <option>Python</option>
              <option>JavaScript</option>
              <option>Java</option>
              <option>C</option>
            </select>
            <button className="text-sm bg-white border border-gray-300 rounded px-3 py-2 hover:bg-gray-100" onClick={() => setCode("")}>
              Reset
            </button>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="80vh"
              theme="vs-dark"
              language={currLanguage}
              defaultValue="// Write your code here"
              value={code}
              onChange={(value) => handleChange(value)}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </div>

          {/* Action Buttons */}
         {/* Action Buttons */}
<div className="bg-white border-t border-gray-300 p-6 flex flex-col space-y-4">
  {/* First Row - Buttons */}
  <div className="flex justify-between ">
    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleRun}>
      Run
    </button>
    <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700" onClick={handleSubmit}>
      Submit
    </button>
  </div>

  {/* Second Row - Input and Output */}
  <div className="flex flex-row space-x-4">
    <div className="flex-1">
      <label htmlFor="input" className="text-sm font-medium text-gray-700">Input</label>
      <textarea
        id="input"
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      ></textarea>
    </div>
    <div className="flex-1">
      <label htmlFor="output" className="text-sm font-medium text-gray-700">Output</label>
      <textarea
        id="output"
        rows="4"
        readOnly
        value={output}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;