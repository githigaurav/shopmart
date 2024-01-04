class ApiResponse {
    constructor(data, message, statusCode){
        this.data=data
        this.message=message
        this.statusCode=statusCode
    }
    
    static success(data, message, statusCode){
        return new ApiResponse(data, message, statusCode)
    }
    
    static failure (data, message, statusCode){
        return new ApiResponse(data, message, statusCode)
    }

    send(res){
        res.status(this.statusCode).json(this)
    }
}

module.exports= ApiResponse
