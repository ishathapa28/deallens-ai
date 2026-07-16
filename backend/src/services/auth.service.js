import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async({name,email,password}) => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = User.findOne({email: normalizedEmail});

    if(existingUser){
        const error = new Error("User already exists with this email");
        error.statusCode = 400;
        throw error;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
    });

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        },
    };
};

const loginUser = async ({email,password}) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail,
    }).select("+password");

    if(!user){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        },
    };
};

const getUserById = async(userId) => {
    const user = await User.findOne(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

export { registerUser, loginUser, getUserById };