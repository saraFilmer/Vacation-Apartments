import mongoose from "mongoose";
const ApartmentSchema = new mongoose.Schema({
    nameApartment: 
    {
        type: String
    },
    description:
    {
        type: String
    },
    pic:
    {
        type: Buffer,
        required: true
    },
    categoryID:
    {
        type:mongoose.Types.ObjectId,
        ref:'Category',
        require:true
    },
    cityID:
    {
        type:mongoose.Types.ObjectId,
        ref:'City',
        require:true

    },
    adress:
    {
        require:true,
        type: String,
    },
    beds:
    {
        require:true,
        type: Number,
    },
    additives:{
        type: String,

    },
    price:
    {
        require:true,
        type: Number,
    },
    advertiserID:
    {
        type:mongoose.Types.ObjectId,
        ref:'Advertiser',
        require:true
    }

})

export default mongoose.model('Apartment',ApartmentSchema)
