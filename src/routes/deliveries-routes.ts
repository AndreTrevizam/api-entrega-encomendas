import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController()

// Passa pela autenticação e pela autorização antes de fazer o POST. (apenas usuários com a role "sale" podem fazer POST)
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))

deliveriesRoutes.post("/", deliveriesController.create)

export { deliveriesRoutes }