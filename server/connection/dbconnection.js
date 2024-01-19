const mongoose = require("mongoose")
const dbURL = process.env.LOCALDBCON

;(async()=>{
    try {
        await mongoose.connect(dbURL, {dbName:"ecommerce"})
        console.log("Database connection established")
    } catch (error) {
        console.log(error)
    }
})()