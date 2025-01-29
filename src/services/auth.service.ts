import { httpException } from "@/exceptions/httpException";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// alta coexion bajo acoplamiento

// usar un patron singleton
const prisma = new PrismaClient();
const TOKEN_PASSWROD = process.env.TOKEN_PASSWORD || "pass";
export class AuthService {
  static async register(user: User) {
    //ver si el usuario existe

    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (findUser) throw new httpException(409, `User ${user.email} already exists`);

    //encriptar el password

    const passwordEncrypted = await bcrypt.hash(user.password, 10);
    user.password = passwordEncrypted; //por si escaso

    //guardar el usuario en la bd

    return await prisma.user.create({
      data: { ...user, password: passwordEncrypted, role: null },
      omit: { password: true }, //no devuelva el password
    });
  }

  static async login(email: string, password: string) {
    // ver si el usuario existe
    /* const query = `SELECT id, email, role, password  FROM user WHERE email='${email}' AND password='${password}' ` 
    const findUsers = await prisma.$queryRawUnsafe(query) as User[]
    const findUser = findUsers[0] */
    const findUser = await prisma.user.findUnique({ where: { email } });
    if (!findUser) throw new httpException(401, "Invalid user or password"); 

    // Ver si el password coincide
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) throw new httpException(401, "Password incorrect"); 

    // generar el token de autenticacion
    const token = jwt.sign(
      {
        colorFacorito: "azul",
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
      }, // Cosas que guardamos
      TOKEN_PASSWROD,
      { expiresIn: "1h" }
    );
    // devolver el token
    return token;
  }

}
