const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app =  express()
const cookieParer = require('cookie-parser')
const dbconnect = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const captainRoutes = require("./routes/captainRoutes")

app.use(cors())
app.use(express.json())
app.use(cookieParer())

const PORT = process.env.PORT
dbconnect();
app.use("/user" , userRoutes)
app.use("/captain" , captainRoutes)
app.listen(PORT , () => {
    console.log("Server started on port" , PORT)
})