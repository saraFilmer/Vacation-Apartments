import jwt from "jsonwebtoken"
import Category from "./models/Category.js"
import City from "./models/City.js"
import Advertiser from "./models/Advertiser.js"

export const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            return res.status(401).send({ error: 'Authentication failed!' })
        }
        if (decoded) {
            next()
        }
    })

}

export const categoryExists = (req, res, next) => {

    const { categoryID } = req.body

    if (!categoryID && req.method == 'PATCH') {
        return next()
    }

    Category.findById(categoryID)
        .then(category => {
            if (!category) {
                return res.status(404).send({ error: `catgory not found!` })
            }
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

export const cityExists = (req, res, next) => {

    const { cityID } = req.body

    if (!cityID && req.method == 'PATCH') {
        return next()
    }

    City.findById(cityID)
        .then(city => {
            if (!city) {
                return res.status(404).send({ error: `city not found!` })
            }
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

export const advertiserExists = (req, res, next) => {

    const { advertiserID } = req.body

    if (!advertiserID && req.method == 'PATCH') {
        return next()
    }

    Advertiser.findById(advertiserID)
        .then(advertiser => {
            if (!advertiser) {
                return res.status(404).send({ error: `advertiser not found!` })
            }
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}