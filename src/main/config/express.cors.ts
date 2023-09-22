import { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'

/** Function cors middleware */
export const expressCors = (app: Express) => {
    app.use(cors({ origin: '*' }))
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('access-control-allow-methods', '*')
        res.setHeader('access-control-allow-headers', '*')
        res.setHeader('x-powered-by', '*')
        next()
    })
}
