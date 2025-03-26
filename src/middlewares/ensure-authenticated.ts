import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { authConfig } from '@/configs/auth';
import { AppError } from '@/utils/AppError';

interface TokenPayload {
  role: string
  sub: string
}

function ensureAuthenticated(req: Request, res: Response, next:NextFunction) {
  try {
    // Verifica se o token existe
    const authHeader = req.headers.authorization
    
    // Caso não exista, retorna um erro
    if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
    }

    // Separa o token
    const [, token] = authHeader.split(' ')

    // Verifica se o token é válido
    const { role, sub: user_id} = verify(token, authConfig.jwt.secret) as TokenPayload

    // Adiciona o id e o role do usuário na requisição
    req.user = {
      id: user_id,
      role
    }

    return next()
    
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}

export { ensureAuthenticated}