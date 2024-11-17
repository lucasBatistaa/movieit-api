import createUser from "../controllers/users/createUser"
import express from "express"

const router = express.Router()

router.post('/create', createUser)

export default router