import mongoose from "mongoose";
const AdvertiserSchema = new mongoose.Schema({
    email: 
    {
        type: String,
        unique: true,
        require: true,
        match:/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    },
    password:
    {
        type: String,
        require: true,
    },
    phone:
    {
        type: String,
        require: true,
        // match:/^\+(?:[0-9] ?){6,14}[0-9]$/
    },
    otherPhone:
    {
        type: String,
        // match:/^\+(?:[0-9] ?){6,14}[0-9]$/
    },
    apartments:[{
        type:mongoose.Types.ObjectId,
        ref:'Apartment'
    }]


})

export default mongoose.model('Advertiser',AdvertiserSchema)
