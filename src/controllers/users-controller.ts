import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { hash } from "bcrypt"

class UsersController {
    async create(req: Request, res: Response) {
        // Validando os dados de entrada
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { name, email, password } = bodySchema.parse(req.body)

        // Criptografando a senha
        const hashedPassword = await hash(password, 8)

        return res.json(hashedPassword)
    }
}

export { UsersController}