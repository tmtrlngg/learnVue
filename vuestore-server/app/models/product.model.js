const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    code: String,
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    averageRating: Number
});

productSchema.method("toJSON", function() {
    const{__v, _id, ...object} = this.toObject()
    object.id = _id;
    return object
})

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product;