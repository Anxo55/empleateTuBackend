import { prisma } from "../database/database";
import { httpException } from "../exceptions/httpException";

export class UserService {
  static async getByEmail(email: string) {
    const findUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true, // Asegúrate de incluir solo los campos necesarios
      },
    });
    if (!findUser) throw new httpException(404, "User not found");
    return findUser;
  }

  static async getById(id: number) {
    const findUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    if (!findUser) throw new httpException(404, "User not found");
    return findUser;
  }

  static async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    if (!users.length) throw new httpException(404, "No users found");
    return users;
  }
}
