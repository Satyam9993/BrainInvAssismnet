import express from 'express';
import Register from './register.js';
const router = express.Router();

router.use('/', Register);

export default router;
