import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { isAuthenticate } from "../middlewares/auth.middelware";

const router = Router();

// Perfil del usuario autenticado
router.get('/profile', isAuthenticate, UserController.profile);

// Listar todos los usuarios (solo admin)
router.get('/', isAuthenticate, isAdmin, UserController.getAll);

export default router;
