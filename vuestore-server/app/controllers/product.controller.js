const db = require('../models');

const Product = db.products;

exports.findAll = async (req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.findOne = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({code: id})
        if(!product) {
            throw new Error('product not found')
        }
        res.send(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}
