import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class DeliveryLogsController {
  async create(req: Request, res: Response) {
    // Valida o o body da requisição
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string()
    })

    const { delivery_id, description } = bodySchema.parse(req.body)

    // Busca no banco se o delivery existe
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id
      }
    })

    // Caso não exista, retorna erro 404
    if (!delivery) {
      throw new AppError("Delivery not found", 404)
    }

    if (delivery.status === "delivered") {
      throw new AppError("Delivery already delivered", 400)
    }

    // Caso o status seja "processing", avisa que é necessário mudar para "shipped"
    if (delivery.status === "processing") {
      throw new AppError("Change status to shipped", 400)
    }

    // Finalmente faz a inserção do log no banco
    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    })

    return res.status(201).json()
  }

   async show(req: Request, res: Response) {
    // Valida o o params da requisição
    const paramsSchema = z.object({
      delivery_id: z.string().uuid()
    })

    const { delivery_id } = paramsSchema.parse(req.params)

    // Busca no banco de dados as informações do delivery
    // e os logs relacionados a ele
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id
      },
      include: {
        logs: true,
        user: true,
      }
    })

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" })
    }

    // Se o usuário for um cliente e ele tentar acessar o log de outro cliente, retorna erro 401
    if (req.user?.role === "customer" && req.user.id !== delivery?.userId) {
      throw new AppError("Unauthorized", 401)
    }

    return res.json(delivery)
  }
}

export { DeliveryLogsController}