import { Request, Response } from "express"


export const  checkNotAuthenticated = (req: Request, res: Response, next) =>  {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  export const  checkAuthenticated = (req: Request, res: Response, next) =>  {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
