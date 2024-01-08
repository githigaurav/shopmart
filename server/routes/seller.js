const seller=require("express").Router()
const {mongoose} = require ('mongoose');
// importing utils
const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

// importing DB
const{Seller,Product} = require("../schema/index")

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


seller.post("/signup", tryCatch(async(req, res)=>{

    const {email, password}= req.body
    const isExists = await isDataExists(email , Seller)

    if(!!isExists.length){
       return ApiResponse.failure([],"Email is already exists", 409).send(res)
    }
    const encryptPass = await encryptPassword(password)    
    const payload = {...req.body , password:encryptPass}
    const addData = await addToMongoDb(payload , Seller)
    const genToken = await jwtToken({id:addData[0]._id})
    res.cookie("token", genToken)

    if(!!addData.length){
        return ApiResponse.success(addData, "User Register successfully", 201).send(res)
    }

}))
seller.post("/login", tryCatch(async(req,res)=>{
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
seller.get("/dashboard",verify, tryCatch(async(req,res)=>{
    const {id} = req.info
    const isExists = await isExistsById (id, Seller)
    ApiResponse.success(isExists, "Data fetched succcessfully", 200).send(res)
}))


//* Request require token for verification and file for uploading
seller.post("/addproduct", verify,handleFile, tryCatch(async(req,res)=>{
    const {id}=req.info  
    //* uploading file to cloudinary  
    const fileURL = await uploadToCloud(req)

    if(fileURL.url){
        //* updating file url which received from cloudinary after uplaoding image
        const productInfo={...req.body , file:fileURL.url}
        //* adding product information object in mongodb
        const response = await addToMongoDb(productInfo , Product)
        //* Pushing Product Object Id to seller Products Array
        const addProductToSeller = await Seller.findByIdAndUpdate(id, {$push:{products:response._id}})
        //* Updating newly created product seller using seller Object Id
        const addProductOwner = await Product.findByIdAndUpdate(response?._id.toString(), {$set:{seller:addProductToSeller._id}},{runValidator:false})
        //* sending response to client
        ApiResponse.success(response, "Product Added Successfully" , 201).send(res)

    }     
    
    
}))






















module.exports=seller