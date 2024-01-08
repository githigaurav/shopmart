const user = require("express").Router()

const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

// importing DB
const{Seller,Product , User} = require("../schema/index")

// importing global controllers
const{
    isDataExists,
    addToMongoDb,
    encryptPassword,
    jwtToken,
    verifyPassword,
    isExistsById,
    uploadToCloud
}= require("./../controllers/globalControllers")

// importing middleware
const {verify, handleFile}=require("../middleware/globalMiddleware")

user.post("/signup", tryCatch(async(req, res)=>{
    const {email, password}= req.body
    const isExists = await isDataExists(email , User)

    if(!!isExists.length){
        return ApiResponse.failure([],"Email is already exists", 409).send(res)
     }

     const encryptPass = await encryptPassword(password)    
     const payload = {...req.body , password:encryptPass}
     const addData = await addToMongoDb(payload , User)
     const genToken = await jwtToken({id:addData._id})
     res.cookie("token", genToken)
     
     if(!!addData.length){
        return ApiResponse.success(addData, "User Register successfully", 201).send(res)
    }
}))

user.post("/login", tryCatch(async(req, res)=>{
    const {email, password}= req.body
    const isExists = await isDataExists(email , Seller)
    if(!!isExists.length){
        const matchPasswod = await verifyPassword(password, isExists[0]?.password ) 
        if(matchPasswod){
            const genToken = await jwtToken({id:isExists[0]?._id})
            res.cookie('token', genToken)
            return ApiResponse.success([], "Login successfully" , 200).send(res)
        }else{
            return ApiResponse.failure([],"Password is not matched", 401).send(res)
        }        
    }
    return ApiResponse.failure([],"Email doesn't exists", 401).send(res)
}))
user.get("/dashboard", tryCatch(async(req, res)=>{
    console.log(req.body)
}))




















module.exports=user