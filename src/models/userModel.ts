import { prisma } from "../lib/prismaClient"
import { z } from "zod"

export const userSchema = z.object({
    id: z.number().positive(),
    publicId: z.string().uuid(),
    name: z.string().min(3).max(80),
    email: z.string().email().max(200),
    password: z.string().min(8).max(256)
})

export type User = z.infer<typeof userSchema>

export const validateUserToCreate = (user) => {
    const partialUserSchema = userSchema.partial({
        id: true,
        publicId: true,
    })

    return partialUserSchema.safeParse(user)
}

export const validateUserToLogin = (user) => {
    const partialUserSchema = userSchema.partial({
        id: true,
        publicId: true,
        name: true,
    })

    return partialUserSchema.safeParse(user)
}

export const UserModel = {
    create: async (dataUser) => {

        const user = await prisma.user.create({
            data: dataUser,
            select: {
                id: true,
                email: true,
                name: true,
            }
        })

        return user
    },

    getByEmail: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }, 
            select: {
                id: true,
                email: true, 
                name: true,
                password: true,
            }
        })

        return user
    }
}