import express from 'express';
import multer from 'multer';
import { registerUser, verifyOtp } from '../controller/Register.js';
const router = express.Router();
const upload = multer({ storage : multer.memoryStorage() });


router.post('/register',upload.single("filename") , registerUser);
router.post('/verify',verifyOtp);

export default router;
