const db = require('../models');

const Product = db.products;

exports.findAll = async (req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    } catch (error) {
        res.status(409).send(error)
    }
    
}