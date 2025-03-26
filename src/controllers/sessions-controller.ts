import { Request, Response } from "express"

class SessionsController {
  async create(req: Request, res: Response) {
    return res.json("ok")
  }
}

export { SessionsController }