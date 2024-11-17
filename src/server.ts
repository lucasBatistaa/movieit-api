import express from 'express'
import cors from 'cors'

import { env } from './config'
import userRouter  from './routers/userRouter'
import authRouter from './routers/authRouter'
import { errorHandler } from './middleware/error-handler'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => { res.status(200).json({ message: 'Hello World!' })})
app.use('/auth', authRouter)
app.use('/user', userRouter)

app.use(errorHandler)

app.listen(env.PORT, () => {
    console.log(`Server is running! ${env.HOST}${env.PORT}`)
})