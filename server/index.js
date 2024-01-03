require("dotenv").config()
require("./connection/dbconnection")
const express = require("express")
const server= express()

// server configuration
server.use(express.json())

// importing routes
const {seller} = require("./routes/index")


// settingup routes
server.use('/seller', seller)




const PORT=process.env.PORT || 4001
server.listen(PORT,()=>{
    console.log(`Server Status:OK  PORT ${PORT} `)
})