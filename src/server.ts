import express from 'express'
import cors from 'cors'

import { PORT } from './config'
import useRouter  from './routers/userRouter'

const app = express()

app.get('/', (req, res) => { res.status(200).json({ message: 'Hello World!' })})

app.use(cors())
app.use(express.json())
app.use('/user', useRouter)

app.listen(PORT, () => {
    console.log(`Server is running! localhost:${PORT}`)
})