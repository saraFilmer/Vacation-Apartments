import Advertiser from '../models/Advertiser.js'
import Apartment from '../models/Apartment.js'
import Category from '../models/Category.js'
import City from '../models/City.js'
import multer from 'multer'

//תמונות לענן
const storage = multer.memoryStorage(); // או multer.diskStorage() אם אתה רוצה לשמור על דיסק
const upload = multer({ storage: storage });

//הצגת כל הדירות
export const getAll = (req, res) => {
    //populate-לראות בתצוגה
    Apartment.find().populate(['categoryID', 'advertiserID', 'cityID'])
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//	שליפת דירה לפי קוד
export const getById = (req, res) => {
    Apartment.findById(req.params.id).populate(['categoryID', 'advertiserID', 'cityID'])
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//•	שליפת דירות לפי קוד קטגוריה
export const getByCatgeory = (req, res) => {
    Category.find().where({ _id: req.params.id }).populate({
        path: 'apartments',
        populate: [
            { path: 'categoryID' },
            { path: 'advertiserID' },
            { path: 'cityID' }
        ]
    }).select('-_id apartments')
        .then(category => {
            res.status(200).send({ category })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// •	שליפת דירות לפי קוד עיר
export const getByCity = (req, res) => {
    City.find().where({ _id: req.params.id }).populate({
        path: 'apartments',
        populate: [
            { path: 'categoryID' },
            { path: 'advertiserID' },
            { path: 'cityID' }
        ]
    }).select('-_id apartments')
        .then(city => {
            res.status(200).send({ city })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//•	שליפת דירות לפי כמות מיטות 
export const getByBeds = (req, res) => {
    Apartment.find().where({
        $and: [
            { beds: { $gte: req.params.small } },
            { beds: { $lte: req.params.big } }
        ]
    }).populate(['categoryID', 'advertiserID', 'cityID'])
        .then(apartments => {
            res.status(200).send({ apartments })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//•	שליפת דירות לפי מחיר 
export const getByPrice = (req, res) => {
    Apartment.find().where({
        $and: [
            { price: { $gte: req.params.small } },
            { price: { $lte: req.params.big } }
        ]
    }).populate(['categoryID', 'advertiserID', 'cityID'])
        .then(apartments => {
            res.status(200).send({ apartments })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// •	שליפת דירות לפי קוד מפרסם *
export const getByAdvertiser = (req, res) => {
    Advertiser.find().where({ _id: req.params.id }).populate({
        path: 'apartments',
        populate: [
            { path: 'categoryID' },
            { path: 'advertiserID' },
            { path: 'cityID' }
        ]
    }).select('-_id apartments')
        .then(advertiser => {
            res.status(200).send({ advertiser })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { advertiserID, price, additives, beds, adress, cityID, categoryID, description, nameApartment } = req.body
    //שמירת התמונה
    const pic = req.file.buffer;
        
    const newApartment = new Apartment({
        advertiserID, price, additives, beds, adress, cityID, categoryID, pic, description, nameApartment
    })
    if (!req.file || !req.file.buffer) {
        return res.status(400).send({ error: "לא הועלתה תמונה או תמונה לא חוקית." });
    }
    
    newApartment.save()
        .then(async apartment => {            
            let a = await Advertiser.findByIdAndUpdate(apartment.advertiserID, { $push: { apartments: apartment._id } })
            let b = await City.findByIdAndUpdate(apartment.cityID, { $push: { apartments: apartment._id } })
            let c = await Category.findByIdAndUpdate(apartment.categoryID, { $push: { apartments: apartment._id } })

            if (!a || !b || !c) {
                return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update arrys failed` })
            }
            return res.status(200).send({ message: `create apartment ${apartment._id} succeed!` })
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })

}

export const remove = async (req, res) => {
    const { id, advertiserID } = req.params
    try {
        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).send({ error: `Apartment not found!` });
        }

        if (apartment.advertiserID != advertiserID) {
            return res.status(403).send({ error: `אינך יכול למחוק דירה לא שלך!` });
        }
        Apartment.findByIdAndDelete(req.params.id)
            .then(async apartment => {
                if (!apartment) {
                    return res.status(404).send({ error: `apartment not found!` })
                }
                let a = await Advertiser.findByIdAndUpdate(apartment.advertiserID, { $pull: { apartments: apartment._id } })
                let b = await City.findByIdAndUpdate(apartment.cityID, { $pull: { apartments: apartment._id } })
                let c = await Category.findByIdAndUpdate(apartment.categoryID, { $pull: { apartments: apartment._id } })
                if (!a || !b || !c) {
                    return res.status(200).send({ message: `delete apartment ${apartment._id} succeed! update failed!` })
                }
                res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
            })
            .catch(err => {
                res.status(500).send({ error: err.message })
            })
    }
    catch {
        res.status(500).send({ error: err.message })

    }
}

export const update = async (req, res) => {

    const { _id } = req.body

    if (_id) {
        return res.status(403).send({ error: `update id is error!` })
    }

    const { id, advertiserID } = req.params
    try {
        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).send({ error: `Apartment not found!` });
        }

        if (apartment.advertiserID != advertiserID) {
            return res.status(403).send({ error: `Unauthorized access!` });
        }
        Apartment.findByIdAndUpdate(id, req.body)
            .then(async apartment => {
                //שולף את הנתונים לעדכון
                const { cityID, advertiserID, categoryID } = req.body

                if (categoryID) {
                    //מחיקה מהישן
                    let a1 = await Category.findByIdAndUpdate(apartment.categoryID, { $pull: { apartments: apartment._id } })
                    //הוספה לחדש
                    let a2 = await Category.findByIdAndUpdate(categoryID, { $push: { apartments: apartment._id } })
                    //מחיקה מהישן
                    let b1 = await City.findByIdAndUpdate(apartment.cityID, { $pull: { apartments: apartment._id } })
                    //הוספה לחדש
                    let b2 = await City.findByIdAndUpdate(cityID, { $push: { apartments: apartment._id } })
                    //מחיקה מהישן
                    let c1 = await Advertiser.findByIdAndUpdate(apartment.advertiserID, { $pull: { apartments: apartment._id } })
                    //הוספה לחדש
                    let c2 = await Advertiser.findByIdAndUpdate(advertiserID, { $push: { apartments: apartment._id } })

                    if (!a1 || !a2 || !b1 || !b2 || !c1 || !c2) {
                        return res.status(200).send({ message: `update apartment ${apartment._id} succeed!, upadte aparments failed!` })
                    }
                }
                return res.status(200).send({ message: `update aparment ${apartment._id} succeed!` })
            })
            .catch(err => {
                res.status(500).send({ error: err.message })
            })
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
}