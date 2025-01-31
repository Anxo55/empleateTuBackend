// import { OffertService } from "../services/offert.service";
import { OffertService } from "../services/offert.service";
import {Request, Response, NextFunction } from "express";

export class OffertController {
    
static async getAll(req: Request, res: Response, next:NextFunction) {
    //para ofertas
    try {
        const offers = await OffertService.getAll()
        res.status(200).json(offers)
    } catch (error) {
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
    try {
        const offer = req.body 
        const offerSaved = await OffertService.save(offer)
        res.status(201).json(offerSaved)
    } catch (error) {
        next(error)
    }

}


static async delete(req:Request, res:Response,next:NextFunction) {
    try {
        const id = Number.parseInt(req.params.id)
        const offerDeleted = await OffertService.delete(id)
        res.status(200).json(offerDeleted)
    } catch (error) {
        next(error)
    }
    
}

static async update(req:Request, res:Response,next:NextFunction) {
    try {
        const id = Number.parseInt(req.params.id)
        const offer = req.body
        const offerUpdated = await OffertService.update(id, offer)
        res.status(200).json(offerUpdated)
    } catch (error) {
        next(error)
    }
    
}

static async rate(req:Request, res:Response,next:NextFunction) {
    
}

static async getRate(req:Request, res:Response,next:NextFunction) {
    
} 

}