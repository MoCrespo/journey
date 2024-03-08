import express, {Application, Request, Response} from 'express';

import * as dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

import connectDB from './config/db';

const app : Application = express()
const port = process.env.PORT || 3000
dotenv.config()
connectDB()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.send("Server is running 👌")
})
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})

