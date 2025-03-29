import { Request, Response } from "express"
import { z } from "zod"
import { hash } from "bcrypt"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class UsersController {
    async create(req: Request, res: Response) {
        // Validando os dados de entrada
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { name, email, password } = bodySchema.parse(req.body)

        // Verifica se um usuário com o mesmo email já existe
        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })
        if (userWithSameEmail) {
            throw new AppError("User with same email already exists")
        }

        // Criptografando a senha
        const hashedPassword = await hash(password, 8)

        // Salvando o usuário no banco de dados
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        // Retornando o usuário sem a senha
        const { password: _, ...userWithoutPassword } = user

        return res.status(201).json(userWithoutPassword)
    }
}

export { UsersController}