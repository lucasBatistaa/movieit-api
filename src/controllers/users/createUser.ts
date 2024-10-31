import UserModel from "../../models/userModel"
import { v4 as uuid } from "uuid"
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {
    try {
        const dataUser = req.body

        dataUser.public_id = uuid()
        dataUser.password = bcrypt.hashSync(dataUser.password, 10)

        const userCreated = await UserModel.create(dataUser)

        return res.status(200).json({
            message: 'User created!',
            userCreated
        })
    } catch (error) {
        console.log(error)
    }
}

export default createUser