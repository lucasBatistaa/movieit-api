import { NextFunction, Request, Response } from 'express'
import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'

import { UserModel } from "../../models/userModel"
import { validateUserToCreate } from '../../utils/userSchemaZod'
import { ClientError } from '../../errors/client-error'

export default async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.body
        const userValidated = validateUserToCreate(user)
        
        if (!userValidated.success) {
            return next(userValidated.error)
        }

        const emailExists = await UserModel.emailExists(userValidated.data.email)

        if (emailExists) {
            return next(new ClientError('Este e-mail já possui uma conta!'))
        }

        userValidated.data.publicId = uuid()
        userValidated.data.password = await bcrypt.hash(userValidated.data.password, 10)

        const userCreated = await UserModel.create(userValidated.data)

        if (!userCreated) {
            return next(new ClientError('Erro ao criar usuário!'))
        }

        res.status(200).json({
            message: 'Usuário criado!',
            userCreated
        })
    } catch (error) {
        next(error)
    }
}