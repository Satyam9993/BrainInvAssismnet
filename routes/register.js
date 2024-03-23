import express from 'express';
import multer from 'multer';
import { registerUser } from '../controller/Register.js';
const router = express.Router();
const upload = multer({ storage : multer.memoryStorage() });


router.post('/register',upload.single("filename") , registerUser);

export default router;
