import UserModel from "../../models/userModel"

const createUser = async (req, res) => {
    try {
        const dataUser = req.body

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