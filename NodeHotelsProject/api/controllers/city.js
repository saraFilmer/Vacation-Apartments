// יבוא של המודל
import City from '../models/City.js'

export const getAll = (req, res) => {
    City.find().select('nameCity')
        .then(cites => {
            res.status(200).send({ cites })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { nameCity } = req.body

    const newCity = new City({
        nameCity,
        apartments: []
    })

    newCity.save()
        .then(city => {
            res.status(200).send({ message: `create city ${city._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

