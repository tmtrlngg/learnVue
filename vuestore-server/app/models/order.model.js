const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user_id: Number,
    cart_items: [String]
})

orderSchema.method("toJSON", function() {
    const{__v, _id, ...object} = this.toObject()
    object.id = _id;
    return object
})

const Order = mongoose.model('Order', orderSchema, 'orders')

module.exports = Order