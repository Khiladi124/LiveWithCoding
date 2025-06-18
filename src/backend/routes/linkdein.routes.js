import {Router} from 'express';
import runLinkedinBot from '../controllers/linkedinbot.controller.js';

const linkedinRouter = Router();

// Routes
linkedinRouter.route('/runLinkedinBot').post(runLinkedinBot);

export default linkedinRouter;