const user = require("express").Router()
const {mongoose}=require("mongoose")
const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

// * importing Validation files
const {
  authValidation,
  orderValidation
} = require("./../utilis/validation")
// importing DB
const{Seller,Product ,User, Order} = require("../schema/index")

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
const {verifyUser, handleFile}=require("../middleware/globalMiddleware")

user.post("/signup", tryCatch(async(req, res)=>{
    //* Get client Email && Password from body
    const {email:clientEmail, password}= req.body

    // * convert lowercase 
    const email = clientEmail.toLowerCase()
   
    //* Validate Email && Password
    await  authValidation.validateAsync({email, password})

    //* Check is client Email Id is already Exists
    const isExists = await isDataExists(email , User)

    // ! If email id aleady exists then send a response to client
    if(!!isExists.length){
        return ApiResponse.failure([],"Email is already exists", 409).send(res)
     }

    //* Encrypt client password
     const encryptPass = await encryptPassword(password)  
    //* Replace client password with Encrypted password   
     const payload = {...req.body , password:encryptPass}
    // * Add client data to mongodb 
     const addData = await addToMongoDb(payload , User)
    // * Generate a token for client Authentication
     const generatedToken = await jwtToken({id:addData._id} , process.env.USER_JWT_KEY)
    
    // *Cookie options config
    const options ={
      // domain: 'example.com',
      path: '/',
      // maxAge: 900000, 
      // httpOnly: true,
      secure: true,
      // sameSite: 'lax' 
    }
    // * Set Cookie in client browser with token and role
    res.cookie("token", generatedToken)
    res.cookie("role","user",{secure:true})

    // * Send Response to client after successfull registration
    return ApiResponse.success([{token:generatedToken}], "User Register successfully", 201).send(res)
    
}))

user.post("/login", tryCatch(async(req, res)=>{
    //* Get client Email && Password from body
    const {email:clientEmail, password}= req.body

    // * convert lowercase 
    const email = clientEmail.toLowerCase()

    //* Check is client Email Id is already Exists
    const isExists = await isDataExists(email , Seller)

    // * if user exists then 
    if(!!isExists.length){

         // * Verifying Password
        const isPasswordOK = await verifyPassword(password, isExists[0]?.password ) 
        // * if password match and verify
        if(isPasswordOK){
          // * Generate a token for client Authentication
          const generatedToken = await jwtToken({id:isExists[0]?._id} , process.env.USER_JWT_KEY)
           // *Cookie options config
           const options ={
            // domain: 'example.com',
            path: '/',
            // maxAge: 900000, 
            // httpOnly: true,
            secure: true,
            // sameSite: 'lax' 
          }
          // * Set Cookie in client browser with token and role
          res.cookie('token', generatedToken , options)
          res.cookie("role","user",{secure:true})
           // * Send Response to client after successfully login
           return ApiResponse.success([{token:generatedToken}], "Login successfully" , 200).send(res)
      
      // * if password doesn't match   
      }else{
        // * Send response to client 
        return ApiResponse.failure([],"Password is not matched", 401).send(res)
        }        
    }
    // * if Email doesn't exists in database
    return ApiResponse.failure([],"Email doesn't exists", 401).send(res)
}))

user.get("/dashboard", tryCatch(async(req, res)=>{
    
}))

user.post("/order", verifyUser ,tryCatch(async(req, res)=>{
    // // * getting client unique id from middleware 
    // const {id}=req.info
    // const orderData={...req.body , userId:id}
    //  await orderValidation.validateAsync(orderData)
     
    // const session = await mongoose.startSession();
    //                 session.startTransaction();
    //      //* Saving User Order
    //     const ordered = await addToMongoDb(orderData, Order)
    //     // * looping throught orders items
    //     for(const products of ordered?.userOrderList){
    //          // * extracting productId so so that we can find products
    //         const productIds=products.product
    //         //  * finding Product using product id && expanding seller schema
    //         const product = await Product.findById(productIds).populate('seller')
    //         // * Containing seller ids 
    //         const sellerId= product?.seller._id
    //         // * finding && updating seller orders so that seller can check is there any order
    //        await Seller.findByIdAndUpdate(
    //           sellerId,
    //           {$push:{orders:products}},
    //           {runValidator:false}
    //         )
    //         }
    //  await session.commitTransaction();
    //               session.endSession();
    // ApiResponse.success([] , "Order has been placed successfully",200).send(res)
    

    //* getting client unique id from middleware 
    const {id}=req.info
    const orderData={...req.body , userId:id}
     await orderValidation.validateAsync(orderData)
     
    const session = await mongoose.startSession();
                    session.startTransaction();
         //* Saving User Order
        const ordered = await addToMongoDb(orderData, Order)
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
    ApiResponse.success([] , "Order has been placed successfully",200).send(res)

}))

user.get("/history", verifyUser ,tryCatch(async(req, res)=>{
    const {id}= req.info
    const userOrder = await Order.aggregate([

        {
          $match: {
            userId:new mongoose.Types.ObjectId(id)
          }
        },
        {
          $project: {
            _id:0,
            userId:0,
            createdAt:0,
            updatedAt:0,
          }
        },
        {
          $unwind:"$userOrderList"
        },
        {
          $project:{__v:0}
        },
  {
		$lookup: {
		  from: "products",
		  localField: "userOrderList.product",
		  foreignField: "_id",
		   as: "userOrderList.product"
		}	
  },
  {
		$unwind:"$userOrderList.product"
  },
  {
          $group:{  
            _id:1,    
            orders:{$push: "$userOrderList"}
          }
        }

        
    ])  
      
    return ApiResponse.success(userOrder[0]?.orders || [],"Order fetch succcessfully", 200).send(res)
}))




















module.exports=user