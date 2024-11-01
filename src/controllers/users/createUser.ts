import { Request, Response } from 'express'
import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'

import { UserModel, userSchema } from "../../models/userModel"

export default async function CreateUser(req: Request, res: Response) {
    try {
        const publicId = uuid()
        const dataToParse = { publicId, ...req.body }
        const dataUser = userSchema.parse(dataToParse)

        dataUser.password = bcrypt.hashSync(dataUser.password, 10)

        const userCreated = await UserModel.create(dataUser)

        return res.status(200).json({
            message: 'User created!',
            userCreated
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: 'Error'
        })
    }
}