import connectToDatabase from "../../middleware/middleware";
let jwt = require('jsonwebtoken');
import User from '../../models/User'
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {



    try {
        if (req.method == 'POST') {

            let user = await User.findOne({ email: req.body.email })

            if (user) {

                if (req.body.password) {

                    try {

                        await user.updateOne({ password: CryptoJS.AES.encrypt(req.body.password, process.env.KEY).toString() })
                        let data = { email: user.email, name: user.name }
                        let token = jwt.sign(data, process.env.KEY)
                        res.send(token)
                    } catch (error) {
                        res.status(500).send("No")
                    }


                } else {

                    let msg = Math.ceil(100000+(1000000-100000)*Math.random())

                    // TODO : Sending message to user email
                    const sendMessage = () => {

                    }

                    sendMessage()
                    res.status(200).send(msg)
                }


            } else {
                res.status(400).send("User Not Found")
            }
        } else {
            res.status(400).send('Not allowed')
        }
    } catch (error) {

        res.status(500).send("Error Occurred")
    }

}

export default connectToDatabase(handler)