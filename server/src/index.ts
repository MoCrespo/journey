import express, {Application} from 'express';
import path from 'path'
import flash from 'express-flash'
import session from 'express-session';
import passport from 'passport';
import methodOverride from 'method-override'


import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

import connectDB from './config/db';

import userRoutes from './routes/login.routes';
import journeyRoutes from './routes/journey.routes';
import { initialize } from './auth/passport';

const app : Application = express()
const port = process.env.PORT || 3000
dotenv.config()
connectDB()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
initialize(passport)
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', "ejs")


userRoutes(app)
journeyRoutes(app)



app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})


export default app;
