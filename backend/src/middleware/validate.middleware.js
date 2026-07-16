import AppError from "../utils/AppError.js";

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            const validationMessage = result.error.issues
                .map((issue) => issue.message)
                .join(", ");

            return next(new AppError(validationMessage, 400));
        }

        req.body = result.data;

        next();
    };
};

export default validate;