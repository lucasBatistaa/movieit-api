import express from 'express'
import { PORT } from './config'

const app = express()

app.get('/', (req, res) => { res.status(200).json({ message: 'Hello World!' })})

app.listen(PORT, () => {
    console.log(`Server is running! localhost:${PORT}`)
})