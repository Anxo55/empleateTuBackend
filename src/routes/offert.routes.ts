import { OffertController } from "../controllers/offert.controller"
import { Router } from "express"

const router = Router()
// // GET listar todas las ofertas localhost:3000/api/offerts/?title=react&category=dam
// router.get('/', OffertController.getAll)
// // // POST añadir una oferta nueva localhost:3000/api/offerts/ {body}
// router.post('/', OffertController.save)
// // // DELETE borrar una oferta localhost:3000/api/offerts/XXXX
// router.delete('/:id', OffertController.delete)
// // // PUT modificar una oferta localhost:3000/api/offerts/XXXX
// router.put('/:id', OffertController.update)

// // // Calificamos una oferta x {body}
// router.post('/:id/rate/', OffertController.rate)
// // // Vemos que calificacion x se le ha data a una oferta
// router.get('/:id/rate/', OffertController.getRate)

export default router