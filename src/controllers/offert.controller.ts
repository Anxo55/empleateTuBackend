// import { OffertService } from "../services/offert.service";
import { OffertService } from "../services/offert.service";
import {Request, Response, NextFunction } from "express";

export class OffertController {
    
static async getAll(req: Request, res: Response, next:NextFunction) {
    try {
      const user = await OffertService.getAll();
      res.status(200).json(user);
    } catch (error){
      next(error)
    }
  }

static async getByID(req:Request, res:Response, next:NextFunction) {
    try {
        const id = Number.parseInt(req.params.id)
        const offer = await OffertService.getById(id)
        res.status(200).json(offer)
    } catch (error) {
        next(error)
    }
}

static async save(req:Request, res:Response,next:NextFunction) {

}

static async delete(req:Request, res:Response,next:NextFunction) {
    
}

static async update(req:Request, res:Response,next:NextFunction) {
    
}

static async rate(req:Request, res:Response,next:NextFunction) {
    
}

static async getRate(req:Request, res:Response,next:NextFunction) {
    
} 

}