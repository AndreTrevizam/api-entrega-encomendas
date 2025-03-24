import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/AppError"
import { ZodError } from "zod"

export function errorHandling(error: any, req: Request, res: Response, next: NextFunction) {
    // Tratar o erro caso seja uma instância de AppError
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    // Tratar o erro caso seja uma instância de ZodError (erro de validação)
    if (error instanceof ZodError) {
        return res.status(400).json({ message: "validation error", issues: error.issues })
    }

    // Erro genérico
    return res.status(500).json({ message: error.message })
}