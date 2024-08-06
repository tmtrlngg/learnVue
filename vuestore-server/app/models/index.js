const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

mongoose.Promise = global.Promise

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = Product;
db.orders = Order

module.exports = db