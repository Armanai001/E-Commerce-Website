import mongoose from "mongoose";

const connectToDatabase = handler => async (req, res) => {

    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    await mongoose.connect(process.env.MONGODB_URL)
    return handler(req, res);


}


export default connectToDatabase;