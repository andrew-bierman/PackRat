import express from "express";

/**
 * Handles errors that occur during the execution of a request.
 * @param {any} error - The error object that occurred.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function in the middleware chain.
 */
export function errorHandler(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(error);
    let statusCode;
    let errorMessage;
    if (error instanceof Error) {
        switch (error.name) {
            case "ValidationError":
                statusCode = 422;
                errorMessage = "Invalid input data";
                break;
            case "NotFoundError":
                statusCode = 404;
                errorMessage = "Resource not found";
                break;
            case "UnauthorizedError":
                statusCode = 401;
                errorMessage = "Unauthorized access";
                break;
            case "PermissionDeniedError":
                statusCode = 403;
                errorMessage = "Permission denied";
                break;
            case "TimeoutError":
                statusCode = 504;
                errorMessage = "Request timed out";
                break;
            case "NetworkError":
                statusCode = 500;
                errorMessage = "Network error";
                break;
            case "InvalidCredentialsError":
                statusCode = 401;
                errorMessage = "Invalid credentials";
                break;
            case "AuthenticationError":
                statusCode = 401;
                errorMessage = "Authentication failed";
                break;
            case "InvalidTokenError":
                statusCode = 401;
                errorMessage = "Invalid token";
                break;
            case "InvalidRequestError":
                statusCode = 400;
                errorMessage = "Invalid request";
                break;
            case "InvalidResponseError":
                statusCode = 500;
                errorMessage = "Invalid response";
                break;
            case "MongoError":
                statusCode = 500;
                errorMessage = "MongoDB error";
                break;
            default:
                statusCode = 500;
                errorMessage = "It's not you, It's us having trouble processing your request";
                break;
        }
    }
    if (error.statusCode && error.message) {
        statusCode = error.statusCode;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage, code: statusCode });
}