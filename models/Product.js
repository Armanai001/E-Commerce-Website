const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    des: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String },
    color: { type: String },
    price: { type: Number, required: true, min: 0 },
    availableQty: { type: Number, required: true, min: 0 },
}, { timestamps: true })

mongoose.models = {}

export default mongoose.model('Product', ProductSchema);