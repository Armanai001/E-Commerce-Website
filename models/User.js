const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    pin: { type: Number, default: null },
    phone: { type: Number, default: null },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    address: { type: String, default: "" },
    otherEmail: { type: String, default: "" }
}, { timestamps: true })

mongoose.models = {}


export default mongoose.model('User', UserSchema);