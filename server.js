require("dotenv").config();

require('./config/db.connection')

const { PORT } = process.env;

const express = require("express");

const app = express();

const cors = require('cors')
const morgan = require('morgan')

const toursRouter = require('./routes/tours')

//Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use('/tours', toursRouter)

app.get("/", (req, res) =>{
    res.send("Hello World")
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`))


