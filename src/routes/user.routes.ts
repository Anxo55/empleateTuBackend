import { Router } from "express";
import { isAuthenticate } from "@/middlewares/auth.middelware";
import { UserController } from "@/controllers/user.controller";

const router = Router()

router.get('/profile', isAuthenticate, UserController.profile)
// crear un endpoitn que liste todos los usuarios de la web, necesitaremos un middelware nuevo, es posible que 
// creemos un nuevo controller y demas
// A este endpoint solo puede aceder el usuario role => admin
// crear rutas, servicios, controllers, middelwares.


export default router