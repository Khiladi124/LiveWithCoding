import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
    getAllProblems,
    getProblemById,
    addProblem,
    updateProblem,
} from '../controllers/problem.controller.js';


const problemRouter = Router();

problemRouter.get('/getproblem', getAllProblems);

problemRouter.get('/getproblem/:problemId', verifyJWT, getProblemById);

problemRouter.post('/addproblem', verifyJWT, addProblem);
problemRouter.post('/updateproblem/:problemid', verifyJWT, updateProblem);

// problemRouter.get('/getproblem/:problemId/sampletestcases', verifyJWT, getAllTestCases);

export default problemRouter;
