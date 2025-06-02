import {Router} from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { getReview } from '../controllers/gemini.controller.js';

const geminiRouter=Router();

geminiRouter.post('/:problemId/getReview',verifyJWT, getReview);

export default geminiRouter;