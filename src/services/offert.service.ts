import { prisma } from "../database/database";
import { httpException } from "../exceptions/httpException";
import { Offerts, PrismaClient, User } from "@prisma/client";

// alta coexion bajo acoplamiento

// usar un patron singleton
// const prisma = new PrismaClient();

export class OffertService{
  
  static async getById(id: number) {
    const offer = await prisma.offerts.findUnique({ where: { id: id } });
    if (!offer) throw new httpException(404, "Offer not found");
    return offer
  }

  // localhost:3000/api/offerts/?title=dam
  static async getAll(title:string = ''){
    const offerts = await prisma.offerts.findMany({
    where: title? { title: { contains: title } }: {},
    orderBy: { createdAt: 'desc' }, take: 100

    })
  }

  static async create(idUser:number,  offer: Offerts) {

    return await prisma.offerts.create({
      data:{ ...offer,
      idUserCreator: idUser
      }
    })

  }

  static async delete(id: number) {
    const offer = await prisma.offerts.delete({ where: { id: id } });
    return offer;
  }

  static async update(id: number, offer: Offerts) {
    const findOffer = prisma.offerts.findUnique({where: { id} })
    if (!findOffer) throw new httpException(404, "Offer not found");
    return await prisma.offerts.update({
      where: {id },
      data: { ...offer,
      }
    })
  }

  /* static async rate(user: User, id: number, rate: any) {
    const offer = await prisma.offerts.findUnique({ where: { id: id } });
    if (!offer) throw new httpException(404, "Offer not found");

    const rateCreated = await prisma.rates.create({
      data: {
        value: rate.value,
        user: { connect: { id: user.id } },
        offert: { connect: { id: id } },
      },
    });
    return rate
  }

  static async getRate(id: number) {
    const rates = prisma.rates.findMany({
      where: { offertId: id },
      include: { user: true },
    });
    return
  } */
}
