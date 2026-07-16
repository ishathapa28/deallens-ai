const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";

  if (error.name === "ValidationError") {
    statusCode = 400;

    message = Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(", ");
  }

  if (error.code === 11000) {
    statusCode = 409;

    const duplicateField =
      Object.keys(error.keyValue || {})[0] || "field";

    message = `${duplicateField} already exists`;
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: error.stack,
    }),
  });
};

export default errorHandler;