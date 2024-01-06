const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    // USER INFORMATION
    user : {type:String , required : true},
    name : {type:String , required : true},
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true },
    address: { type: String, required: true },

    // ORDER INFORMATION
    orderId: { type: String },
    paymentInfo: { type: String },
    products: { type: Array, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' },

}, { timestamps: true })


export default mongoose.models.Order || mongoose.model('Order', OrderSchema);