import { Request, Response } from 'express'
import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'

import { UserModel, validateUserToCreate } from "../../models/userModel"

export default async function CreateUser(req: Request, res: Response) {
    try {
        const user = req.body
        const userValidated = validateUserToCreate(user)
        
        if (userValidated.error) {
            return res.status(400).json({
                error: 'Erro no login! Verifiquen os dados!',
                fieldErrors: userValidated.error.flatten().fieldErrors
            })
        }

        userValidated.data.publicId = uuid()
        userValidated.data.password = await bcrypt.hash(userValidated.data.password, 10)

        const userCreated = await UserModel.create(userValidated.data)

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