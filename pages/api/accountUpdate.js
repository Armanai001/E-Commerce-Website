import User from '../../models/User';
import connectToDatabase from "../../middleware/middleware";
let jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.method == 'POST') {

        let userToken = await req.body.token;
        let msg;

        // CHECKING FOR USER AUTHENTICATION
        try {
            msg = jwt.verify(userToken, process.env.KEY)
        } catch (error) {
            res.status(401).send("Please verify Your User Account.")
        }


        // THIS WILL EXECUTED AFTER VERIFYING USER AUTHENTICATION
        if (msg) {

            try {

                const user = await User.findOne({ email: msg.email })
                const newToken = jwt.sign({name : req.body.name , email : user.email} , process.env.KEY)


                const password = req.body.old
                const newPassword = CryptoJS.AES.encrypt(req.body.new, process.env.KEY).toString()
                const dbPass = CryptoJS.AES.decrypt(user.password, process.env.KEY).toString(CryptoJS.enc.Utf8);

                const updateDetails = async () => {
                    await User.findByIdAndUpdate(user._id, { name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, otherEmail: req.body.email, phone: req.body.phone, pin: req.body.pin })
                }

                if (password && req.body.new) {
                    if (password === dbPass) {
                        await User.findByIdAndUpdate(user._id, { password: newPassword })
                        updateDetails()
                        res.send(newToken)
                    } else {
                        res.status(401).send("Password you entered is not matching to Your password")
                    }
                } else {
                    updateDetails()
                    res.send(newToken)

                }


                // res.status(200).send(msg)


            } catch (error) {
                res.status(404).send("Invalid details.")
            }

        }
    } else {
        res.status(400).send("Not available")
    }

}

export default connectToDatabase(handler)