import { httpException } from "@/exceptions/httpException";
import { prisma } from "../database/database";
import { Offerts } from "@prisma/client";
// import { HttpException } from "../exceptions/httpException";
// import { Offer, PrismaClient, User } from "@prisma/client";
//const prisma = new PrismaClient()

export class OfferService {

    static async getById(id: number){
        const findOffer = await prisma.offerts.findUnique({ where: {id}})
        if(!findOffer) throw new httpException(404, 'Offer not found')
         return findOffer
     }

     // localhost:3000/api/offer/?title=dam
     static async getAll(title: string = ''){
       /*  return await prisma.offerts.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        }) */

            return await prisma.offerts.findMany({
                where: {
                    ...(title && {
                        title: {
                            contains: title,
                            //mode: "insensitive" // Búsqueda sin distinción entre mayúsculas y minúsculas
                        }
                    })
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 100,
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            });
     }

     static async create(idUser: number, offer: Offerts){
        console.log('creando',idUser)
        return await prisma.offerts.create({
            data: {
                ...offer,
                idUserCreator: idUser
            } 
        })
     }

     static async update(id: number, offer: Offerts){
        const findOffer = await prisma.offerts.findUnique({where:{id}})
        if(!findOffer) throw new httpException(404, 'Offer doesnt exists')
        return await prisma.offerts.update({
            where: {id},
            data: {
                ...offer,
            } 
        })
     }

     static async delete(id: number) {
        try {
            return await prisma.offerts.delete({ where: { id } });
        } catch (error) {
            throw new httpException(404, "Offer not found");
        }
    }
    

     
    static async rate(idOffer: number, idUser: number, value: number): Promise<void> {
        // Validar que el rating está dentro del rango permitido
        if (value < 0 || value > 5) {
          throw new Error("Rating must be between 0 and 5.");
        }
    
        // Verificar si la oferta existe
        const offer = await prisma.offerts.findUnique({ where: { id: idOffer } });
        if (!offer) {
          throw new Error("Offer not found.");
        }
    
        // Actualizar o crear la calificación
    
        /*
        SELECT  AVG(value) AS averageValue, COUNT(value) AS totalCount
    FROM Rating
    WHERE offerId = <offerId>;
        */
        await prisma.rate.upsert({
          where: { idUser_idOffer: { idUser, idOffer } },
          update: { value },
          create: { idUser, idOffer, value },
        });
      }
    
    
      static async getRate(idOffer: number) {
        const ratingStats = await prisma.rate.aggregate({
          where: { idOffer },
          _avg: { value: true }, // Calcular el promedio
          _count: { value: true }, // Contar el total de calificaciones
        });
        return {
          totalRatings: ratingStats._count.value,
          averageRating: ratingStats._avg.value?.toFixed(2)
        }
      }

}