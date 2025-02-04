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

static async create(req:Request, res:Response,next:NextFunction) {
    try {
        const offer = req.body 
        const id = req.body.user.id
        const offerSaved = await OffertService.create(offer, id)
        res.status(201).json(offerSaved)
    } catch (error) {
        next(error)
    }

}


static async delete(req:Request, res:Response,next:NextFunction) {
    try {
        const id = Number.parseInt(req.params.id)
        if(!id) throw new Error("Id is required")
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
    try {
        const id = Number.parseInt(req.params.id)
        const {value} = req.body
        const userId = req.body.user.id

        const offerRated = await OffertService.rate(userId, id , value)
        res.status(200).json(offerRated)
    } catch (error) {
        next(error)
    }
    
}

static async getRate(req:Request, res:Response,next:NextFunction) {
    try {
        const id = Number.parseInt(req.params.id)
        const offerRated = await OffertService.getRate(id)
        res.status(200).json(offerRated)
    } catch (error) {
        next(error)
    }
    
} 

}