import express from 'express'
import { loginView, registerUser, registerView } from '../controllers/login.controller'



const userRoutes = (app: express.Application) => {
    app.get('/register', registerView)
    app.post('/register', registerUser)

    app.get('/login', loginView)
}

export default userRoutes;