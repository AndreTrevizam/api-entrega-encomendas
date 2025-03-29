import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class DeliveriesStatusController {
  async update(req: Request, res: Response) {
    // Fazendo a validação do params (id) da requisição
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    // Fazendo a validação do body da requisição
    // O status pode ser "processing", "shipped" ou "delivered"
    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"])
    })

    const { id } = paramsSchema.parse(req.params)
    const { status } = bodySchema.parse(req.body)

    // Faz a atualização do status da entrega
    await prisma.delivery.update({
      data: {
        status
      },
      where: {
        id
      }
    })

    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: `Delivery status updated to ${status}`
      }
    })

    return res.json()
  }
}

export { DeliveriesStatusController}