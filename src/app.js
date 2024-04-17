const express = require('express')
const cors = require('cors');
const cookieParser = require("cookie-parser")
const appRoute = require("./router");
const { errorHandler } = require('./handler/errohandler');

const app = express();

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))


app.use("/api/v1",appRoute)
app.use(errorHandler)


module.exports = { app };