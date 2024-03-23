import User from "../model/User.js";
import ErrorHandler from "../util/errorHandler.js";
import { generateRandomNumber } from "../util/getRandomNumber.js";
import { sendMail } from "../util/sendMail.js";
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
        const otp = generateRandomNumber();
        const user = await User.create({
            name,
            email,
            password : encryptedPassword,
            profilePicture : imageUrl,
            otp : otp
        });
        const data = {
            user: {
                name: user.name
            },
            activationCode : otp
        }
        // const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"));
        try {
            await sendMail({
                email: user.email,
                subject: 'Activate your account',
                template: 'activation-mail.ejs',
                data
            });
            res.status(201).json({
                success: true,
                message: `Please check your email : ${user.email} to activate your account.`,
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
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
        next(new ErrorHandler(error.message, 400));
    }
}