const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()

const dbconnect = async () => {
    try
    {
        mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("database connected successfully ")
        })
    }catch(error){
        console.log("Error in database connection is" , error)
    }
}
module.exports = dbconnect;