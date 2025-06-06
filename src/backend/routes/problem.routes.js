import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
    getAllProblems,
    getProblemById,
    addProblem,
    updateProblem,
    submitProblem,
    runProblem,
    addTestCase,
} from '../controllers/problem.controller.js';


const problemRouter = Router();

problemRouter.get('/getproblem', getAllProblems);

problemRouter.get('/getproblem/:problemId',  getProblemById);

problemRouter.post('/addproblem', verifyJWT, addProblem);
problemRouter.post('/updateproblem/:problemId', verifyJWT, updateProblem);
problemRouter.post('/getproblem/:problemId/submit', verifyJWT, submitProblem);
problemRouter.post('/getproblem/:problemId/run', runProblem);
problemRouter.post('/getproblem/:problemId/addtestcase', verifyJWT,addTestCase )
// problemRouter.get('/getproblem/:problemId/sampletestcases', verifyJWT, getAllTestCases);

export default problemRouter;
