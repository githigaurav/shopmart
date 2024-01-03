require("dotenv").config()
require("./connection/dbconnection")
const express = require("express")
const server= express()

// server configure
server.use(express.json())

// importing routes
const {seller} = require("./routes/index")


// routing
server.use('/seller', seller)




const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log(`Server Status:OK  PORT ${PORT} `)
})