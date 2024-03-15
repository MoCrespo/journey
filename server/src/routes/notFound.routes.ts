import express, { Request, Response } from "express";
import notFoundMiddleware from "../middleware/notFound.middleware";

const notFoundRoute = (app: express.Application) => {
    app.use((req: Request, res: Response) => {
        notFoundMiddleware(req, res)
    })
}

export default notFoundRoute