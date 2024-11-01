import { prisma } from "../lib/prismaClient"
import { z } from "zod"

export const userSchema = z.object({
    publicId: z.string().uuid(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(255)
})

export type User = z.infer<typeof userSchema>

export const UserModel = {
    create: async (dataUser: User) => {

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