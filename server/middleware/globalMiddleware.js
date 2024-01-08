
// importing necessary controllers
const {verifyToken} = require("../controllers/globalControllers")
const ApiResponse = require("../utilis/apiResponse")
const multer = require("multer")
const path = require('path')

const verify = async(req, res, next)=>{
   try {
    const token = req?.cookies?.token
    const response = await verifyToken (token)
    req.info={id:response.id}
    next()
    
   } catch (error) {
     
      if(error?.name === 'TokenExpiredError'){
         return ApiResponse.failure([], "Session has been expired" , 401).send(res)
        }
      if(error?.name === 'JsonWebTokenError'){
         return ApiResponse.failure([], "Invalid token" , 401).send(res)
         }

      console.log(error)
   }
    
}

const handleFile = function(req, res, next){

   const filePath = path.join(__dirname, "./../tempImg")

   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, filePath)
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      }
    })
  
    const upload = multer({ storage: storage }).single('file');
  
    upload(req, res, async function (err) {
      if (err) {
         ApiResponse.failure([], "Error while uploading file", 409).send(res)
      }
      next()
    })
  
}

module.exports={verify , handleFile}