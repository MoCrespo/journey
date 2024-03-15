import {Request, Response} from 'express'

const notFoundMiddleware  = async (req: Request, res: Response,) => {
 res.status(404).render('not-found')
}

export default notFoundMiddleware;