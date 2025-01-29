import { Router } from "express";
import { isAuthenticate } from "../middlewares/auth.middelware";
import { UserController } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router()

// listar "api/users/", para listar todos los usuarios
router.get('/profile', isAuthenticate, UserController.profile)
router.get('/', isAuthenticate,isAdmin, UserController.getAll) // listar todos los usuarios

export default router