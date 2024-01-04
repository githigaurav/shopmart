const ApiResponse = require('./apiResponse')

const tryCatch = (fn) => {
    return async (req, res) => {
      try {
        await fn(req,res);
      } catch (error) {

       console.log(error);

       if(error?.name === 'ValidationError'){        
        const message = Object.values(error?.errors).map((e) => e.message);
        return ApiResponse.failure([], message[0], 400).send(res);
       }
        
      }
      
    };
  };

module.exports=tryCatch