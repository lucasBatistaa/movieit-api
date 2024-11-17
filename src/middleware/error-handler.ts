import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ClientError } from "../errors/client-error";

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
    if (err instanceof ZodError) {
        res.status(400).json({
            status: "fail",
            message: 'Invalid Input',
            errors: err.flatten().fieldErrors,
        })
    } else if (err instanceof ClientError) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    } else {
        res.status(500).json({
            status: "error",
            message: 'Internal server error',
            code: "ERR500"
        })
    }
}