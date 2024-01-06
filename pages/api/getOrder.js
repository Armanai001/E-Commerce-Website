import Order from "../../models/Order";
import Product from "../../models/Product"
import connectToDatabase from "../../middleware/middleware";
let jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    let productsList = []




    if (req.method == 'POST') {

        try {

            let userToken = await req.body.token;
            let verifyUser = jwt.verify(userToken, process.env.KEY)
            let data;

            if (req.body.id) {
                try {
                    data = await Order.findOne({ _id: req.body.id , user : verifyUser.email })

                    data.products.map(async item => {
                        let dataId = item.id
                        let productDetails = await Product.findById(dataId)
                        item.id = productDetails
                        productsList.push({ id: productDetails._id, title: productDetails.title, slug: productDetails.slug, image: productDetails.image, price: productDetails.price, quantity: item.quantity, color: productDetails.color })
                        if (data.products.length === productsList.length) {
                            data.products = productsList
                            res.json(data)
                        }
                    })

                } catch (error) {
                    data = "0"
                    res.status(400)
                }
            } else {
                data = await Order.find({ user: verifyUser.email })
                res.send(data)
            }



        } catch (error) {
            res.status(404).send("Invalid User credentials")
        }


    } else {
        res.status(400).send("Not available")
    }

}

export default connectToDatabase(handler)