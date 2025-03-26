import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"

class SessionsController {
  async create(req: Request, res: Response) {
    // Validando os dados de entrada
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { email, password } = bodySchema.parse(req.body)

    // Verifica se existe um usuário com o email cadastrado
    const user = await prisma.user.findFirst({
      where: { email }
    })

    // Caso não exista, retorna um erro
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401)
    }

    // Verifica se a senha informada é a mesma que a senha criptografada no banco de dados
    const passwordMatched = await compare(password, user.password)

    // Caso não seja, retorna um erro
    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    // Gera o token JWT
    const token = sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn
    })

    const { password: hashedPassword, ...userWithoutPassword} = user

    return res.json({ token, user: userWithoutPassword })
  }
}

export { SessionsController }