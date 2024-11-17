import express from 'express'
import cors from 'cors'

import { PORT } from './config'
import userRouter  from './routers/userRouter'
import authRouter from './routers/authRouter'

const app = express()

app.get('/', (req, res) => { res.status(200).json({ message: 'Hello World!' })})

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is running! localhost:${PORT}`)
})