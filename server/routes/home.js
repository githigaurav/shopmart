const home = require("express").Router()
// importing utils
const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

// importing DB
const{Seller,Product, Order} = require("../schema/index")

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





home.get("/products", tryCatch(async(req, res)=>{
    const findProducts = await Seller.findById("659cf20e5f1fdf00f84f9a73").populate("products")
    console.log(findProducts)
    ApiResponse.success(findProducts?.products, "Data get successfully",200).send(res)
}))


module.exports=home
