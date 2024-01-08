const user = require("express").Router()

const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')


user.post("/signup", tryCatch(async(req, res)=>{
    console.log(req.body)
}))

user.post("/login", tryCatch(async(req, res)=>{
    console.log(req.body)
}))
user.get("/dashboard", tryCatch(async(req, res)=>{
    console.log(req.body)
}))




















module.exports=user