const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
let server = require('http').createServer(app)
let api = require('./config')

const cors = require('cors')
app.use(cors())

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: false }))

//route
let routes = require('./routes')

// routes(app)
app.use('/api', routes)

// app.use('/image', express.static(__dirname + '/uploads'))
// app.use('/pdfFile', express.static(__dirname + '/pdfFile'))
// app.use('/excelFile', express.static(__dirname + '/excelFile'))
// connect database
mongoose.connect('mongodb://localhost:2x7017/ShoppingDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Connect database successfully!')
        }
    })