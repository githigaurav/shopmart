const seller=require("express").Router()

const {mongoose} = require("mongoose")

//* Importing middleware
const {verifySeller, handleFile}=require("../middleware/globalMiddleware")

// * importing Validation files
const {
  authValidation,
  productValidation,
} = require("./../utilis/validation")

//* Importing Schemas
const{Seller,Product, Order} = require("../schema/index")

//* Importing global controllers
const{
  isDataExists,
  addToMongoDb,
  encryptPassword,
  jwtToken,
  verifyPassword,
  isExistsById,
  uploadToCloud
}= require("./../controllers/globalControllers")

//* Importing utils
const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

seller.post("/signup", tryCatch(async(req, res)=>{

    //* Get client Email && Password from body
    const {email:clientEmail, password}= req.body

    // * convert lowercase 
    const email = clientEmail.toLowerCase()

    //* Validate Email && Password
    await  authValidation.validateAsync({email, password})

    //* Check is client Email Id is already Exists
    const isExists = await isDataExists(email , Seller)

    // ! If email id aleady exists then send a response to client
    if(!!isExists.length){
       return ApiResponse.failure([],"Email is already exists", 409).send(res)
    }

    //* Encrypt client password
    const encryptPass = await encryptPassword(String(password)) 
    
    //* Replace client password with Encrypted password
    const payload = {...req.body , password:encryptPass , email:email}

    // * Add client data to mongodb
    const addData = await addToMongoDb(payload , Seller)

    // * Generate a token for client Authentication
    const generatedToken = await jwtToken({id:addData._id} , process.env.SELLER_JWT_KEY)

    // *Cookie options config
    const options ={
      // domain: 'example.com',
      path: '/seller',
      // maxAge: 900000, 
      // httpOnly: true,
      secure: true,
      // sameSite: 'lax' 
    }
    // * Set Cookie in client browser with token and role
    res.cookie("role","seller", options)
    res.cookie("token", generatedToken)

    // * Send Response to client after successfull registration
    return ApiResponse.success([{token:generatedToken}], "User Register successfully", 201).send(res)

}))

seller.post("/login", tryCatch(async(req,res)=>{
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
            const generatedToken = await jwtToken({id:isExists[0]?._id}, process.env.SELLER_JWT_KEY)
            // *Cookie options config
            const options ={
              // domain: 'example.com',
              path: '/seller',
              // maxAge: 900000, 
              // httpOnly: true,
              secure: true,
              // sameSite: 'lax' 
            }

            // * Set Cookie in client browser with token and role
            res.cookie('token', generatedToken ,options)
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

seller.get("/dashboard",verifySeller, tryCatch(async(req,res)=>{

    // * getting client unique id from middleware 
    const {id} = req.info

    // * Checking client exists or not
    const isExists = await isExistsById (id, Seller)
    
    // * Sending response to client 
   return ApiResponse.success(isExists, "Data fetched succcessfully", 200).send(res)

}))


seller.post("/addproduct", verifySeller,handleFile, tryCatch(async(req,res)=>{
    // * Validating client side data
    await productValidation.validateAsync(req.body)

     // * getting client unique id from middleware
    const {id}=req.info  

    //* uploading file to cloudinary  
    const fileURL = await uploadToCloud(req)

    // * if file successfully loaded on cloudinary
    if(fileURL.url){

        //* updating file url which received from cloudinary after uplaoding image
        const productInfo={...req.body , file:fileURL.url}

        //* adding product information object in mongodb
        const response = await addToMongoDb(productInfo , Product)

        //* Pushing Product Object Id to seller Products Array
        const addProductToSeller = await Seller.findByIdAndUpdate(id, {$push:{products:response._id}})

        //* Updating newly created product seller using seller Object Id
        const addProductOwner = await Product.findByIdAndUpdate(response?._id.toString(), {$set:{seller:addProductToSeller._id.toString()}},{runValidator:false})
       
        //* sending response to client
       return ApiResponse.success(response, "Product Added Successfully" , 201).send(res)
    }   
}))

seller.get('/products', verifySeller , tryCatch(async(req, res)=>{

    // * getting client unique id from middleware 
    const {id}=req.info 
    
    // * Getting client data
    const seller = await Seller.findById(id,{createdAt:0,updatedAt:0,__v:0}).populate({path:'products', select:'-createdAt -updatedAt -__v'}).exec()

    // * sending response to client
    return ApiResponse.success(seller.products, "Product fetch successfully" , 200).send(res)
}))

seller.get('/orders', verifySeller , tryCatch(async(req, res)=>{
     // * getting client unique id from middleware 
    const {id}=req.info 
    
    // * Checking client id && get client info
    const findOrders = await Seller.findById(id)
    // * finding orders
    const productsDetails = await Seller.aggregate([

        {
            $match: {
              _id:new mongoose.Types.ObjectId(id)
            }
          },
          {
                $project: {
                orders:1
                }
          },
           {
            $unwind: "$orders"
          },
          {
            $lookup: {
              from: "products",
              localField: "orders.product",
              foreignField: "_id",
              as: "orders.product"
            }
          },
          {
            $unwind: "$orders.product"
          },
          {
            $group: {
              _id: "$_id",
              orders: { $push: "$orders" }
            }
          }
      ])
      

    return ApiResponse.success(productsDetails[0].orders, "Order fetched successfully",200).send(res)
}))

seller.post('/test', verifySeller , tryCatch(async(req, res)=>{
  await  productValidation.validateAsync(req.body) 
}))


module.exports=seller