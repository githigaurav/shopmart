require("dotenv").config()
require("./connection/dbconnection")
const express = require("express")
const server= express()











const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log(`Server Status:OK  PORT ${PORT} `)
})