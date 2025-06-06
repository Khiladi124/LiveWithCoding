import mongoose from 'mongoose';
import {Problem} from '../models/problem.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/AsyncHandler.js';
import {TestCase} from '../models/testCase.model.js';
import {Submission} from '../models/submission.model.js';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'outputs');     

const getAllProblems = asyncHandler(async (req, res) => {
       console.log('Fetching all problems');
    try{

             console.log('Fetching all problems');
          // Get all problems from the database
             const problems = await Problem.find({}).select("problemId title difficultyLevel tags").lean();
            console.log(problems);
    
        //   Check if problems exist
            if (!problems || problems.length === 0) {
              throw new ApiError(404, 'No problems found');
           }
          // Return success response
        //  res.send(200).json(new ApiResponse(200, 'Problems fetched successfully', problems));
           return res.status(200).json(new ApiResponse(200, 'Problems fetched successfully', problems));

    }catch (error) {
        console.log(error);
        res.status(500).json(new ApiError(500, 'Internal server error', error));
    }
    
});
const getProblemById = asyncHandler(async (req, res) => {
    console.log('Fetching problem by ID');
    try{
         // Get problem id from request params
            const { problemId } = req.params;
            console.log(problemId);
    
            const problem = await Problem.findOne({ problemId: String(problemId) });
            console.log(problem);
            if (!problem) {
               //new ApiError(404, 'Problem not found');
               console.log('Problem not found');
              return res.status(404).json(new ApiError(404, 'Problem not found'));
            }
    
             return res.status(200).json(new ApiResponse(200, 'Problem fetched successfully', problem));

    }catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, 'Internal server error', error));
    }
});

const addProblem=asyncHandler(async (req , res) => {
    console.log('Adding problem');
    try {
        //    const {user}=req.user;
        //    if(user.isVerified===false){
        //     return res.status(403).json(new ApiResponse(403, 'User is not verified'));
        //       }
        // Extract problem details from the request body
        const { title, description, constraints, tags, difficultyLevel, sampleTestCases, isPublished } = req.body;
       
        // Validate required fields
        if (!title || !description ||!constraints) {
            console.log(req.body);
            return res.status(400).json(new ApiResponse(400,null,'Title, description, and constraints are required'));
        }
   
        // Construct the problem object
        const problemData = {
             // Generate a new ObjectId for the problem
            title: title,
            description:description,
            constraints:constraints,
            tags: tags || [],  // Default to empty array if no tags provided
            difficultyLevel: difficultyLevel || 'easy',  // Default to 'easy' if no difficulty level provided
            sampleTestCases: sampleTestCases || [],  // Default to empty array if no sample test cases provided
            isPublished: isPublished || true,  // Default to true
            createdBy: req.user,  // Assuming JWT middleware attaches user info
        };

       
        const newProblem = new Problem(problemData);
        const savedProblem = await newProblem.save();

        // Return success response
         return res.status(201).json(new ApiResponse(201, 'Problem added successfully', savedProblem));
        // return res.status(201).json(new ApiResponse(201, 'Problem added successfully', {}));
    } catch (error) {
        console.error('Error adding problem:', error);
        return res.status(500).json(new ApiResponse(500, 'Server error', { error: error.message }));
    }
});
const updateProblem=asyncHandler(async (req , res) => {
    console.log('Updating problem');
    try {
        // Extract problem details from the request body
        const {user}=req.user;
        if(user.isVerified===false){
            return res.status(403).json(new ApiResponse(403, 'User is not verified'));
        }
        const { problemId } = req.params;
        const { title, description, constraints, tags, difficultyLevel, sampleTestCases, isPublished } = req.body;

        // Validate required fields
        if (!title || !description ||!constraints|| !difficultyLevel) {
            return res.status(400).json(new ApiResponse(400, 'Title, description, and constraints are required'));
        }

        // Construct the problem object
        const problemData = {
             // Generate a new ObjectId for the problem
            title: title,
            description:description,
            constraints:constraints,
            tags: tags || [],  // Default to empty array if no tags provided
            difficultyLevel: difficultyLevel || 'easy',  // Default to 'easy' if no difficulty level provided
            sampleTestCases: sampleTestCases || [],  // Default to empty array if no sample test cases provided
            isPublished: isPublished || true,  // Default to true
            createdBy: req.user.id,  // Assuming JWT middleware attaches user info
        };

       
        const problem = await Problem.findOne({ problemId });
        if (!problem) {
            return res.status(404).json(new ApiResponse(404, 'Problem not found'));
        }
        const savedProblem = await  Problem.replaceOne({problemId}, problemData);
        if (!savedProblem) {
            return res.status(500).json(new ApiResponse(500, 'Error updating problem'));
        }
        // Return success response
        return res.status(201).json(new ApiResponse(201, 'Problem updated successfully', savedProblem));
    } catch (error) {
        console.error('Error adding problem:', error);
        return res.status(500).json(new ApiResponse(500, 'Server error', { error: error.message }));
    }
});


const addTestCase = asyncHandler(async (req, res) => {
    console.log('Adding test case');
    try {
        const { problemId } = req.params;
        console.log(problemId);
        const { input, output } = req.body;
        console.log(input, output);
        const problem = await Problem.findOne({ problemId });
        if (!problem) {
            console.log('Problem not found');
            return res.status(404).json(new ApiResponse(404, 'Problem not found'));
        }
        const _id = problem._id;
        console.log(_id);
        
        if (!input || !output) {
            return res.status(400).json(new ApiResponse(400, 'Input and output are required'));
        }
      
        const testCaseData = {
            "problemId": _id,
            "input": input,
            "output": output,
        };

        const newTestCase = new TestCase(testCaseData);
        await newTestCase.save();
        if (!problem.testCases) {
            problem.testCases = [];
        }
        
        problem.testCases.push(newTestCase._id);
        await problem.save();
        console.log('Test case added successfully',problem.testCases.length);
        return res.status(201).json(new ApiResponse(201, 'Test case added successfully', newTestCase));
    } catch (error) {
         console.error('Error adding test case:', error);
        return res.status(500).json(new ApiResponse(500, 'Server error', { error: error.message }));
    }
});


const submitProblem=asyncHandler(async (req , res) => {
    console.log('Submitting problem');
   
    try {
       
        const { problemId } = req.params;
        const { code, lang } = req.body;
        console.log(problemId, code, lang);
        if (!code || !lang) {
            return res.status(400).json(new ApiResponse(400, 'Code and language are required'));
        }
       
     
        const submissionData = {
            "code": code,
            "lang": lang,
            "problemId": problemId,
            "submittedBy": req.user._id,  
            "output": "",
        };
        const problem = await Problem.findOne({ "problemId" : problemId }).select('testCases').lean();
        const testCasesId = problem?.testCases || [];
        const testCases = await TestCase.find({ _id: { $in: testCasesId } }).select('input output').lean();
        let passedCount = 0;
         let error=null;
   
for (let index = 0; index < testCasesId.length; index++) {
    console.log(testCasesId[index]);
   const testCase=testCases[index];
    console.log(testCase.input);
    const input = testCase.input;
    const response= await axios.post(`${process.env.COMPILER_API_ORIGIN}/run-submission`, { code, lang, input });
    const output=response.data.output;
    console.log('Output:', output);
    if (testCase.output.includes(output)) {
        passedCount++;
    }else{
        break;
    }
    if(output?.error)
    {
        error=output.error;
        break;
    }
}
if(error=='Time Limit Exceeded')
{
    return res.status(300).json(new ApiResponse(300, 'Time Limit Exceeded', { error }));
}


submissionData.output = `${passedCount}/${testCasesId.length} test cases passed`;
const submission = new Submission(submissionData);
await submission.save();

if (passedCount === testCasesId.length) {
    const user= req.user;
    if(!(user.problemSolved.includes(problemId))) {
    user.problemSolved.push(problemId);
    await user.save();
    }
    return res.status(200).json(new ApiResponse(200, 'Accepted', { submissionId: submission._id, output: submission.output }));
} else {
    return res.status(300).json(new ApiResponse(300, 'Wrong Answer', { passed: passedCount }));
}
  } catch(error) {
         console.error('Error submitting problem:', error);
        return res.status(500).json(new ApiResponse(500, 'Server error', { error: error.message }));
    }
}
);


const runProblem=asyncHandler(async (req , res) => {
    console.log('Running problem');
   
    try {
        // Extract problem details from the request body
        const { problemId } = req.params;
        const { code, lang, input } = req.body;
        console.log(problemId, code, lang, input);
        // Validate required fields
        if (!code || !lang) {
            return res.status(400).json(new ApiResponse(400, 'Code and language are required'));
        }

        // Construct the problem object
        const submissionData = {
             // Assuming JWT middleware attaches user info
            output: null,
        };
        
        const response = await axios.post(`${process.env.COMPILER_API_ORIGIN}/run-submission`,{ code, lang, input} );
        const output=response.data.output;
        console.log('Output:', output);
        submissionData.output = output;
        
         return res.status(201).json(new ApiResponse(201, 'Compiled successfully', submissionData));
    }
    catch
    (error) {
        console.error('Error running problem:', error);
        return res.status(500).json(new ApiResponse(500, 'Server error', { error: error.message }));
    }
});

export { getAllProblems, getProblemById , addProblem, updateProblem, submitProblem, runProblem, addTestCase };