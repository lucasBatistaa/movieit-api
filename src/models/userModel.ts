import { prisma } from "../lib/prismaClient"
import { UserCreate, UserCreateValidate } from "../utils/userSchemaZod"

export const UserModel = {
    create: async (dataUser: UserCreateValidate) => {

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
    },

    emailExists: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }
}