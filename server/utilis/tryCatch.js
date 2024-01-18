const ApiResponse = require('./apiResponse')
const fs = require("fs")
const tryCatch = (fn) => {
    return async (req, res) => {
      try {
        await fn(req,res);
      } catch (error) {

        console.log(error)

       if(error?.name === 'ValidationError'){   
        error?.details?.forEach(err => {    
              if(req.file !== undefined){
                const{path}=req?.file
                fs.unlinkSync(path)
              }
              return ApiResponse.failure([], err.message , 400).send(res)    
        });  
       }

      
        
      }
      
    };
  };

module.exports=tryCatch