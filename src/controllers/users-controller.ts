import { Request, Response, NextFunction } from "express"

class UsersController {
    async create(req: Request, res: Response, next: NextFunction) {
        return res.json("User created")
    }
}

export { UsersController}