
// importing necessary controllers
const {verifyToken} = require("../controllers/globalControllers")
const ApiResponse = require("../utilis/apiResponse")
const multer = require("multer")
const path = require('path')
const {fileValidation} = require("./../utilis/validation")
const { promisify } = require('util');
const fs = require('fs')

const verifySeller = async(req, res, next)=>{
  

   let token = req.cookies.token || req.headers.authorization.replace("Bearer ",'')
  

   try {
   //  const token = req?.cookies?.token
    const response = await verifyToken (token , process.env.SELLER_JWT_KEY)
   //  console.log(response)
    req.info={id:response.id}
    next()
    
   } catch (error) {
      console.log(error)
      if(error?.name === 'TokenExpiredError'){
         return ApiResponse.failure([], "Session has been expired" , 401).send(res)
        }
      if(error?.name === 'JsonWebTokenError'){
         
         return ApiResponse.failure([], "Invalid token" , 401).send(res)
         }

      console.log(error)
   }
    
}
const verifyUser = async(req, res, next)=>{
   // let token = req.headers.authorization.replace("Bearer " , '') || req.get('authorization')?.replace("Bearer " , '') || req.cookies.token
   let token = req.cookies.token
   try {
   //  const token = req?.cookies?.token
    const response = await verifyToken (token , process.env.USER_JWT_KEY)
    req.info={id:response.id}
    next()
    
   } catch (error) {
      console.log(error)
      if(error?.name === 'TokenExpiredError'){
         return ApiResponse.failure([], "Session has been expired" , 401).send(res)
        }
      if(error?.name === 'JsonWebTokenError'){
         return ApiResponse.failure([], "Invalid token" , 401).send(res)
         }

      console.log(error)
   }
    
}

// const handleFile = function(req, res, next){

//    const filePath = path.join(__dirname, "./../tempImg")

//    const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, filePath)
//       },
//       filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//       }
//     })
  
//     const upload = multer({ storage: storage }).single('file');
  
//     upload(req, res, async function (err) {
//       if (err) {
//          ApiResponse.failure([], "Error while uploading file", 409).send(res)
//       }
//       next()
//     })
  
// }

const handleFile = async function(req, res, next){
   

   const filePath = path.join(__dirname, "./../tempImg")

   const storage = multer.diskStorage({
      destination:  function (req, file, cb) {
        cb(null, filePath)
      },
      filename:  function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      }
    })
    const upload = multer(
                  { storage: storage}).single('file');
   
    const multerUpload = promisify(upload);
  
   try {
      
      await multerUpload(req, res)
      const{size,originalname,mimetype}=req.file
      await fileValidation.validateAsync({size, originalname, mimetype})
      next()
   } catch (error) {
     console.log(error)
      if(error?.name === 'ValidationError'){ 
         const{path}=req.file
         fs.unlinkSync(path)
         return  error?.details?.forEach(err => {
               return ApiResponse.failure([], err.message , 400).send(res)    
         })
   }
   
   ApiResponse.failure([], "Error while uploading file", 409).send(res)
}}

module.exports={verifySeller , verifyUser , handleFile}