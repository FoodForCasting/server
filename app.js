if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)
mongoose.connect(process.env.URL_MONGOOSE, {useNewUrlParser: true,useUnifiedTopology: true})

app.use(errorHandler)

app.listen(PORT,_=>{console.log(`listening on port ${PORT}`)})