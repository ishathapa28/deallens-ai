import { registerUser as registerUserService, loginUser as loginUserService, getUserById } from "../services/auth.service.js";

const registerUser = async(req,res) => {
    try {

        const result = await registerUserService(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            ...result,
        });
    } 
    catch (error) {
        next(error);
    }
};

const loginUser = async(req, res) => {
    try {
        const result = await loginUserService(req.body);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            ...result,
        });
    }
    catch (error) {
        next(error);
    }
};

const getCurrentUser = async (req,res) => {
    try {
        const user = await getUserById(req.user._id);

        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch(error){
        next(error);
    }
};

export { registerUser, loginUser, getCurrentUser, } ;