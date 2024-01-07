
// importing necessary controllers
const {verifyToken} = require("../controllers/globalControllers")
const ApiResponse = require("../utilis/apiResponse")


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



module.exports={verify}