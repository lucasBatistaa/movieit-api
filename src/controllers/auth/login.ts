import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserModel } from "../../models/userModel";
import { validateUserToLogin } from "../../utils/userSchemaZod";

import { env } from "../../config";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body
        const loginValidated = validateUserToLogin(user)

        if (loginValidated.error) {
            return res.status(400).json({
                error: 'Erro no login! Verifiquen os dados!',
                fieldErrors: loginValidated.error.flatten().fieldErrors
            })
        }

        const registeredUser = await UserModel.getByEmail(loginValidated.data.email)

        if (!registeredUser) {
            return res.status(400).json({
                error: 'E-mail ou senha inválido!',
            })
        }

        const isPasswordValid = await bcrypt.compare(loginValidated.data.password, registeredUser.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                error: 'E-mail ou senha inválido!',
            })
        }

        const token = jwt.sign({ id: registeredUser.id }, env.SECRET_KEY, { expiresIn: '5m' })

        return res.json({ 
            user: {
                name: registeredUser.name,
                email: registeredUser.email,
            },
            token
        })
    } catch (error) {
        console.log(error)
    }
}