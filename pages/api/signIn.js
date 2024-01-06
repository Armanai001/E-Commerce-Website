import User from "../../models/User";
import connectToDatabase from "../../middleware/middleware";
import cryptoJs from "crypto-js";
let jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    // const KEY = "THIS IS SECRET KEY"

    try {
        if (req.method == 'POST') {

            let userdetails = await User.findOne({ "email": req.body.email })

            if (userdetails) {

                // Decrypting Password from database
                const dbpass = cryptoJs.AES.decrypt(userdetails.password, process.env.KEY).toString(cryptoJs.enc.Utf8);

                if (req.body.password == dbpass) {
                    try {
                        // Sending Json Web token
                        let tokendata = { email: userdetails.email, name: userdetails.name }
                        const token = jwt.sign(tokendata, process.env.KEY);
                        res.status(200).send(token)
                    } catch (error) {
                        res.status(500).send("Error Occurred ")
                    }
                } else {
                    res.status(401).send("Invalid credentials")
                }

            } else {
                res.status(404).send("User Not Found")
            }

        } else {
            res.status(400).send('Not allowed')
        }
    } catch (error) {

        res.status(500).send("Error Occurred")
    }

}

export default connectToDatabase(handler)