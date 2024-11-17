import { prisma } from "../lib/prismaClient"
import { z } from 'zod'

export const userSchema = z.object({
    // public_id: z.string().uuid(),
    name: z.string().min(4),
    email: z.string(),
    password: z.string().min(8)
})

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
    }
}