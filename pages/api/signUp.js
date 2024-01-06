import User from "../../models/User";
import connectToDatabase from "../../middleware/middleware";
var CryptoJS = require("crypto-js");
let jwt = require('jsonwebtoken');


const handler = async (req, res) => {



    try {
        if (req.method == 'POST') {

            let user = new User({
                name: req.body.name,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.KEY).toString(),     // Main string , Secret Key
                email: req.body.email
            })

            try {
                await user.save();

                // Sending Json Web token
                let tokendata = { email: user.email, name: user.name }
                const token = jwt.sign(tokendata, process.env.KEY);

                res.status(200).send(token)
            } catch (error) {
                res.status(500).send("Invalid credentials")
            }
        } else {
            res.status(400).send('Not allowed')
        }
    } catch (error) {

        res.status(500).send("Error Occured")
    }

}

export default connectToDatabase(handler)