import User from "../model/User.js";
import ErrorHandler from "../util/errorHandler.js";
import { upLoadImage } from "../util/uploadImage.js";


export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const file = req.file;

    try {

        if(file === undefined){
            return next(ErrorHandler('Please upload a file', 400));
        }

        const imageUrl = await upLoadImage(file);

        // const user = await User.create({
        //     name,
        //     email,
        //     password
        // });

        console.log(imageUrl);

        res.status(201).json({
            success: true,
            imageUrl
        });
    } catch (error) {
        next(ErrorHandler(error.message, 400));
    }
};