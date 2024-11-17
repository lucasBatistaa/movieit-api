import { z } from "zod"

export const userSchema = z.object({
    id: z.number().positive(),
    publicId: z.string().uuid(),
    name: z.string().min(3).max(80),
    email: z.string().email().max(200),
    password: z.string().min(8).max(256)
})

export const userSchemaValidateToCreate = userSchema.partial({
    id: true,
    publicId: true,
})

export const validateUserToCreate = (user: UserCreateValidate) => {
    return userSchemaValidateToCreate.safeParse(user)
}

export type UserCreateValidate = z.infer<typeof userSchemaValidateToCreate>

export const userSchemaValidateToLogin = userSchema.partial({
    id: true,
    publicId: true,
    name: true,
})

export const userSchemaToCreate = userSchema.partial({
    id: true,
})



export const validateUserToLogin = (user: UserLoginValidate) => {
    return userSchemaValidateToLogin.safeParse(user)
}

export type User = z.infer<typeof userSchema>
export type UserLoginValidate = z.infer<typeof userSchemaValidateToLogin>
export type UserCreate = z.infer<typeof userSchemaToCreate>