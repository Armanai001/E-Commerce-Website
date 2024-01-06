import Product from "../../models/Product";
import connectToDatabase from "../../middleware/middleware";

const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {


            for (let index = 0; index < req.body.length; index++) {

                await Product.findByIdAndUpdate(req.body[index]._id, req.body[index])
            }
            res.status(200).send("Product Updated")
        } catch (error) {
            res.status(400).send("Invalid details")
        }
    } else {
        res.status(400).send("Error Occurred")
    }

}

export default connectToDatabase(handler)