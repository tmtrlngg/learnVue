const db = require('../models');

const Order = db.orders;

exports.findOrder = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Order.aggregate([{
            $match: {
                user_id: Number(id)
            }
        }, {
            $lookup: {
                from: "products",
                localField: "cart_items",
                foreignField: "code",
                as: "products"
            }
        }])
        res.send(result)
    } catch (error) {
        res.status(409).send({
            message: error.message || "Error retrieving orders."
        })
    }
}

exports.addToCart = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const productCode = String(req.body.product)
    
        const result = await Order.updateOne({user_id: id}, {$addToSet: {cart_items: productCode}})
        res.send(result)
    } catch (error) {
        res.status(409).send({
            message: error.message
        })
    }
}

exports.removeFromCart = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const productCode = String(req.params.product)
    
        const result = await Order.updateOne({user_id: id}, {$pull: {cart_items: productCode}})
        res.send(result)
    } catch (error) {
        res.status(409).send({
            message: error.message
        })
    }
}