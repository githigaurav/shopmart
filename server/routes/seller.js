const seller=require("express").Router()
// importing utils
const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

// importing DB
const{Seller} = require("../schema/index")

// importing global controllers
const{
    isDataExists,
    addToMongoDb,
    encryptPassword,
    jwtToken
}= require("./../controllers/globalControllers")

seller.post("/signup", tryCatch(async(req, res)=>{
    const {email, password}= req.body
    const isExists = await isDataExists(email , Seller)

    if(!!isExists.length){
       return ApiResponse.failure([],"Email is already exists", 409).send(res)
    }
    
    const encryptPass = await encryptPassword(password)
    const payload = {...req.body , password:encryptPass}
    const addData = await addToMongoDb(payload , Seller)
    const genToken = await jwtToken({id:addData[0]._id.toString()})
    res.cookie("token", genToken)

    if(!!addData.length){
        return ApiResponse.success(addData, "User Register successfully", 201).send(res)
    }
}))
seller.post("/login", tryCatch(async(req,res)=>{
   res.status(200).json("Successfully login")
}))
seller.get("/dashboard", tryCatch(async(req,res)=>{
    
}))
seller.post("/addproduct", tryCatch(async(req,res)=>{
    
}))






















module.exports=seller