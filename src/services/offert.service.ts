import { httpException } from "../exceptions/httpException";
import { PrismaClient, User } from "@prisma/client";

// alta coexion bajo acoplamiento

// usar un patron singleton
const prisma = new PrismaClient();
export class OffertService{

  static async getById(id: number) {
    const findUser = await prisma.user.findUnique({ where: { id: id } });
    if (!findUser) throw new httpException(404, "User not found");
    return findUser;
  }

  // listar todos los usuarios
  static async getAll(){
    const users = await prisma.user.findMany({
        omit: {password:true}
    })
    return users
  }
}
