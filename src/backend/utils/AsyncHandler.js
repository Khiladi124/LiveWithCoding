import { ApiError } from "./ApiError.js";

/*
    -> Making a reusable wrapper function for async/await error handling.
    -> This eliminates the need to use try/catch blocks in every asynchronous route handler.
*/

const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (err) {
            // console.log(err);
            if (err instanceof ApiError) {
                res.status(err.statusCode).json({
                    message: err.message,
                    statusCode: err.statusCode,
                    success: err.success,
                    errors: err.errors,
                });
            } else {
                res.status(500).json({
                    message: "Internal Server Error",
                });
            }
        }
    };
};

export { asyncHandler };