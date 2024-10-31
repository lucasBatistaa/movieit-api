import { prisma } from "../lib/prismaClient"

const UserModel = {
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

export default UserModel