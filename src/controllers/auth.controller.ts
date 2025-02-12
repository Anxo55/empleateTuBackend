import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ErrorMiddleware } from "../middlewares/error.middleware";


export class AuthController{
    static async register (req:Request, res:Response, next:NextFunction){
        try {
            console.log("llegate registration");
            
            const userData = req.body
            const newUser = await AuthService.register(userData)
            res.status(201).json({message:'User register successfully', newUser}) 
        } catch (error) {
            next(error)
        }
        
    }
   static async login (req:Request,res:Response, next: NextFunction){
    
    try {
        const userData = req.body
        // TODO: validar el body (opcional)
        const token = await AuthService.login(userData.email,userData.password)
        res.cookie('token', token, {
            maxAge:60*60*1000, //1 hora de caducidad
            httpOnly: true, //no se puede acceder mediante javaSript
            secure: false, //solo se envia si usas https
            sameSite: 'strict' // Evita ataques CSRF

        }) 
        // TODO: inyectar cookie al cliente
        res.status(201).json({message:'Login successfully', token})
        
    } catch (error) {
        next(ErrorMiddleware)
    }

    }

}
