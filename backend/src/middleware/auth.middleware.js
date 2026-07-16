import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Authentication token is required",
            });
        }

        const token = authorizationHeader.split(" ")[1];

        const decodedToken = jwt.verify( token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id);

        if(!user) {
            return res.status(401).json({
                success:false,
                message: "The user belonging to this token no longer exists",
            });
        }

        req.user = {
            id: user._id,
            role: user.role,
        };

        next();
    }
    catch(error){
         if(error.name ==="TokenExpiredError"){
            return res.status(401).json({
                success: false,
                message: "Authentication token has expired",
            });
         }
    
    return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
    });
}
};

export default protect;
