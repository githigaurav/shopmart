require("dotenv").config()
require("./connection/dbconnection")
const express = require("express")
const server= express()
const cors = require("cors")
var cookie = require('cookie-parser')

// server configuration
server.use(express.json())
server.use(cors({
    origin:["http://localhost:3000", "https://shopmart-liard.vercel.app" ,"https://shopmart-liard.vercel.app"],
    credentials:true
}))
server.use(cookie())
// importing routes
const {seller, user , home} = require("./routes/index")

// settingup routes
server.use('/seller', seller)
server.use('/user', user)
server.use('/home', home)
server.get("/",(req,res)=>{
    res.status(200).json({message:"Server Side is Working fine"})
})

const PORT=process.env.PORT || 4001
server.listen(PORT,()=>{
    console.log(`Server Status:OK  PORT ${PORT} `)
})