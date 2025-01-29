import { NextFunction, Request, Response } from "express";
import { AuthService } from "@/services/auth.service";
import { Prisma } from "@prisma/client";
import { UserService } from "../services/user.service";

export class UserController {
  static async profile(req: Request, res: Response, next:NextFunction) {
    try {
      const { email } = req.body.user;
      // La constante del email va entre llaves por que le esta desestructurando
      const user = await UserService.getByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  }

  static async getAll(req: Request, res: Response, next:NextFunction) {
    try {
      const user = await UserService.getAll();
      res.status(200).json(user);
    } catch (error){
      next(error)
    }
  }
}
