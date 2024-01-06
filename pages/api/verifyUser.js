import connectToDatabase from "../../middleware/middleware";
let jwt = require('jsonwebtoken');
import User from '../../models/User'


const handler = async (req, res) => {

    try {
        if (req.method == 'POST') {

            let userToken = await req.body.token;
            let data = jwt.verify(userToken, process.env.KEY)


            let user = await User.findOne({ email: data.email })
            let { name, email, city, state, address, otherEmail, phone, pin, createdAt, updatedAt } = user
            let msg = { name, email, city, state, address, otherEmail, phone, pin, createdAt, updatedAt }

            res.status(200).json(msg)
        } else {
            res.status(400).send('Not allowed')
        }
    } catch (error) {

        res.status(500).send("Error Occurred")
    }

}

export default connectToDatabase(handler)