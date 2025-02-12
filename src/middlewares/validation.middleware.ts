import { validationResult } from "express-validator";
import { Request, Response,NextFunction } from "express";
import { httpException } from "../exceptions/httpException";

export const ValidationMiddleware = (req:Request, res:Response, next:NextFunction):any =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // next(new httpException(400, errors.array()))
        return res.status(400).json({error: errors.array()})
    }
    next()
}