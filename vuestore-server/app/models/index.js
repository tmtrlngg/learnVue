const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');
const Product = require('../models/product.model');

mongoose.Promise = global.Promise

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = Product;

module.exports = db