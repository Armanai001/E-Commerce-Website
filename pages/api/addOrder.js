import Order from "../../models/Order";
import Products from '../../models/Product';
import connectToDatabase from "../../middleware/middleware";
let jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    if (req.method == 'POST') {

        let userToken = await req.body.token;
        let msg;
        let sum = 0;

        // CHECKING FOR USER AUTHENTICATION
        try {
            msg = jwt.verify(userToken, process.env.KEY)
        } catch (error) {
            res.status(401).send("Please verify Your User Account.")
        }


        // THIS WILL EXECUTED AFTER VERIFYING USER AUTHENTICATION
        if (msg) {

            try {

                // CALCULATING TOTAL PRICE OF PRODUCT'S 
                for (let index = 0; index < req.body.products.length; index++) {
                    const element = req.body.products[index];
                    let itemPrice = await Products.findById(element.id)
                    sum = sum + (element.quantity * itemPrice.price)


                }

                // IF SUM IS EQUAL TO TOTAL PRICE SEND BY USER THEN THIS WILL EXECUTED
                if (sum === req.body.total) {


                    let orders = new Order({
                        user: msg.email,
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        state: req.body.state,
                        city: req.body.city,
                        pinCode: req.body.pin,
                        address: req.body.address,

                        orderId: req.body.orderId,
                        paymentInfo: req.body.paymentInfo,
                        products: req.body.products,
                        total: req.body.total,
                        status: req.body.status,
                    })
                    await orders.save();

                    // TODO: Checking for payment status is that pending or not?

                    // Updating Order state

                    req.body.products.map(async item => {
                        await Products.findOneAndUpdate({ _id: item.id }, { $inc: { "availableQty": -item.quantity } })
                    })










                    res.status(200).send("Order Added")



                } else {
                    res.status(403).send("You change the value of products")
                }

            } catch (error) {
                console.log(error)
                res.status(404).send("Invalid details.")
            }

        }
    } else {
        res.status(400).send("Not available")
    }

}

export default connectToDatabase(handler)