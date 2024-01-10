const user = require("express").Router()
const {mongoose}=require("mongoose")
const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

// importing DB
const{Seller,Product ,User,Order} = require("../schema/index")

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
     return ApiResponse.success(addData, "User Register successfully", 201).send(res)
    
}))

user.post("/login", tryCatch(async(req, res)=>{
    const {email, password}= req.body
    const isExists = await isDataExists(email , User)
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

user.post("/order",tryCatch(async(req, res)=>{

  const session = await mongoose.startSession();
                    session.startTransaction();
        const{userId , order}=req.body
         //* Saving User Order
        const ordered = await addToMongoDb(req.body, Order)
        // * looping throught orders items
        for(const products of ordered?.userOrderList){
             // * extracting productId so so that we can find products
            const productIds=products.product
            //  * finding Product using product id && expanding seller schema
            const product = await Product.findById(productIds).populate('seller')
            // * Containing seller ids 
            const sellerId= product?.seller._id
            // * finding && updating seller orders so that seller can check is there any order
           await Seller.findByIdAndUpdate(
              sellerId,
              {$push:{orders:products}},
              {runValidator:false}
            )
            }
     await session.commitTransaction();
                  session.endSession();
        res.send("Order Successfully")

}))




















module.exports=user