require("dotenv").config()
require("./connection/dbconnection")
const express = require("express")
const server= express()
const cors = require("cors")

// server configuration
server.use(express.json())
server.use(cors({
    origin:true,
    credentials:true
}))
// importing routes
const {seller} = require("./routes/index")


// settingup routes
server.use('/seller', seller)




const PORT=process.env.PORT || 4001
server.listen(PORT,()=>{
    console.log(`Server Status:OK  PORT ${PORT} `)
})