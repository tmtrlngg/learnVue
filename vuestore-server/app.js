const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = require('./app/models/')

db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connect to MongoDb')
    }).catch((err) => {
        console.log('Cannot Connect to db!', err)
        process.exit()
    })

app.get('/', (req, res) => {
    res.json({
        message: "Hello"
    })
})

app.use('/api/products', require('./app/routes/product.route'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})