import { httpException } from "../exceptions/httpException";
import { PrismaClient, User } from "@prisma/client";

// alta coexion bajo acoplamiento

// usar un patron singleton
const prisma = new PrismaClient();

export class OffertService{
  

  static async getById(id: number) {
    const offer = await prisma.offerts.findUnique({ where: { id: id } });
    if (!offer) throw new httpException(404, "Offer not found");
    
  }

  // listar todos los usuarios
  static async getAll(){
    const offerts = await prisma.offerts.findMany();
    return offerts;
  }

  static async save(offer: any) {

    const offerts = await prisma.offerts.create({
      data: {
        title: offer.title,
        description: offer.description,
        category: offer.category,
        expired: offer.expired,
        userCreator: offer.userCreator,
      },
    });
    return offerts

  }

  static async delete(id: number) {
    const offer = await prisma.offerts.delete({ where: { id: id } });
    return offer;
  }

  static async update(id: number, offer: any) {
    const offerUpdated = await prisma.offerts.update({
      where: { id: id },
      data: offer,
    });
    return offerUpdated;
  }

}
