import mongoose from "mongoose";
const CitySchema = new mongoose.Schema({
    nameCity:
    {
        type: String,
        require: true,
    },
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

export default mongoose.model('City', CitySchema)
