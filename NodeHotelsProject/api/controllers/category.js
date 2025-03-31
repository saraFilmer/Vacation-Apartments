import Category from '../models/Category.js'

export const getAll = (req, res) => {
    Category.find().select('nameCategory')
        .then(categories => {
            res.status(200).send({ categories })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { nameCategory } = req.body

    const newCategory = new Category({
        nameCategory,
        apartments: []
    })

    newCategory.save()
        .then(category => {
            res.status(200).send({ message: `create category ${category._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

