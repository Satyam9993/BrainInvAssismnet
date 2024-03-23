import User from "../model/User.js";
import ErrorHandler from "../util/errorHandler.js";
import { generateRandomNumber } from "../util/getRandomNumber.js";
import { upLoadImage } from "../util/uploadImage.js";
import bcrypt from 'bcryptjs';


export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const file = req.file;

    try {

        if(file === undefined){
            return next(new ErrorHandler('Please upload a file', 400));
        }

        if(!name || !email || !password){
            return next(new ErrorHandler('Please enter all fields', 400));
        }

        const imageUrl = await upLoadImage(file);

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password : encryptedPassword,
            profilePicture : imageUrl,
            otp : generateRandomNumber()
        });

        res.status(201).json({
            success: true,
            email : user.email,
            message : "Otp has been sent to your email address"
        });
    } catch (error) {
        next(ErrorHandler(error.message, 400));
    }
};

export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if(!email || !otp){
            return next(new ErrorHandler('Please enter all fields', 400));
        }

        const user = await User.findOneAndUpdate({email : email, otp : otp}, {$set : {isEmailVerified : true}}, {new : true});

        if(!user){
            return next(new ErrorHandler('Invalid OTP', 400));
        }

        return res.status(200).json({
            success: true,
            email : user.email,
            message : "OTP verified successfully"
        });

    } catch (error) {
        next(ErrorHandler(error.message, 400));
    }
}