// estende os tipos do framework Express para incluir uma propriedade personalizada no objeto Request.
declare namespace Express {
  export interface Request {
    user?: {
      id: string
      role: string
    }
  }
}