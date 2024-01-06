import Product from "../../models/Product";
import connectToDatabase from "../../middleware/middleware";

const handler = async (req, res) => {

    if (req.method == 'POST') {
        try {
            for (let index = 0; index < req.body.length; index++) {

                let products = new Product({
                    title: req.body[index].title,
                    slug: req.body[index].slug,
                    des: req.body[index].des,
                    category: req.body[index].category,
                    image: req.body[index].image,
                    type: req.body[index].type,
                    color: req.body[index].color,
                    price: req.body[index].price,
                    availableQty: req.body[index].availableQty,

                })
                await products.save();
                console.log(products)
            }
            res.status(200).send("Products Added")
        } catch (error) {
            res.status(400).send("Invalid Details")
        }
    } else {
        res.status(400).send("Error Occurred")
    }

}

export default connectToDatabase(handler)