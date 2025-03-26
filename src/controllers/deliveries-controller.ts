import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class DeliveriesController {
  async create(req: Request, res: Response) {
    return res.json("ok")
  }
}

export { DeliveriesController }