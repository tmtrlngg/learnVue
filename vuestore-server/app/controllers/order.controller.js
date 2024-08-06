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