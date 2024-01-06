import Product from "../../models/Product";
import connectToDatabase from "../../middleware/middleware";

const handler = async (req, res) => {

    // let some = req.header('some')

    if (req.query.id) {
        try {
            let products = await Product.findById(req.query.id)
            res.json(products)
        } catch (error) {
            res.status(404).send("Not found")
        }

    } else {

        let products = await Product.find()

        res.status(200).json({ products })
    }


}

export default connectToDatabase(handler)