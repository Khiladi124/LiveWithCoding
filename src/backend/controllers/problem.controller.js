import mongoose from 'mongoose';
import {Problem} from '../models/problem.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/AsyncHandler.js';
import {TestCase} from '../models/testCase.model.js';
import {Submission} from '../models/submission.model.js';
import generateFile from '../runSubmission/generateFile.js';
import  execute from '../runSubmission/execute.js';
import fs from 'fs';
import { runCode } from '../runSubmission/execute.js';


const getAllProblems = asyncHandler(async (req, res) => {
       console.log('Fetching all problems');
    try{

             console.log('Fetching all problems');
          // Get all problems from the database
             const problems = await Problem.find({}).select("problemId title").lean();
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
    
            const problem = await Problem.findOne({ problemId });
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

const submitProblem=asyncHandler(async (req , res) => {
    console.log('Submitting problem');
    // return res.status(200).json(new ApiResponse(200, 'Problem submitted successfully', {}));
    try {
        // Extract problem details from the request body
        const { problemId } = req.params;
        const { code, lang } = req.body;
    //    console.log(problemId,code, lang);
        // Validate required fields
        if (!code || !lang) {
            return res.status(400).json(new ApiResponse(400, 'Code and language are required'));
        }

        // Construct the problem object
        const submissionData = {
            "code": code,
            "lang": lang,
            "problemId": problemId,
            "submittedBy": req.user._id,  // Assuming JWT middleware attaches user info
            "output": "",
        };

        const filePath = await generateFile(lang, code);
        console.log('Filename:', filePath);
        const output = await execute(filePath);
        console.log('Output:', output);
        submissionData.output = output;
        const submission = new Submission(submissionData);
         await submission.save();

        // Return success response
         return res.status(201).json(new ApiResponse(201, 'Problem submitted successfully', {output: output}));
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
        const filePath = await generateFile(lang, code);
        const inputPath = await generateFile("txt", input);
        console.log('Filename:', filePath, inputPath);
        const output = await runCode({filePath, inputPath});
        console.log('Output:', output);
        submissionData.output = output;
        fs.unlinkSync(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
        fs.unlinkSync(inputPath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
       
        // Return success response
         return res.status(201).json(new ApiResponse(201, 'Compiled successfully', submissionData));
    }
    catch
    (error) {
        console.error('Error running problem:', error);
        return res.status(500).json(new ApiResponse(500, 'Server error', { error: error.message }));
    }
});

export { getAllProblems, getProblemById , addProblem, updateProblem, submitProblem, runProblem};