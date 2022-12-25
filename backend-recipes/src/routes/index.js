import express from 'express';
import auth from './auth.js';
import dishes from './dishes.js';

const router = express.Router();
router.use('/auth', auth);
router.use('', dishes);

export default router