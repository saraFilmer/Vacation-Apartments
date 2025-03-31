import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    nameCategory: 
    {
        type: String,
        require: true,
    },
    apartments:[{
        type:mongoose.Types.ObjectId,
        ref:'Apartment'
    }]
})

export default mongoose.model('Category',CategorySchema)
