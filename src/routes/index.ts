import { Router } from "express"
import { userRoutes } from "@/routes/users-routes"
import { sessionRoutes } from "@/routes/sessions-routes"
import { deliveriesRoutes } from "./deliveries-routes"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/deliveries", deliveriesRoutes)

export { routes }