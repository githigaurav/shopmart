const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



const isDataExists = async(email ,schema)=>{
    const response = await schema.find({email:email})
    return response //[]
}

const addToMongoDb = async (info, schema) => {
    const db = new schema(info)
    const addedData = await db.save()   
    //To exclude a specific field you can leverage Mongoose's projections feature.
    const response = await schema.find({_id:addedData._id},{ password: 0, createdAt: 0, updatedAt: 0 , __v:0})   
    return response
}

const encryptPassword = async(plainPassword)=>{
        const response = await bcrypt.hash(plainPassword,10);
        return response    
}


const jwtToken = async (data)=>{
    const token = jwt.sign(data , process.env.secrectKey ,{expiresIn:"1d"})
    return token   
}

const verifyPassword = async(password, hash)=>{    
    const response = await bcrypt.compare(password , hash);
    return response    
}

const verifyToken = async (token)=>{
    const response = jwt.verify(token, process.env.secrectKey)
    return response
}

const isExistsById=async (id , schema)=>{
    const response = await schema.findById(id,{ password: 0, createdAt: 0, updatedAt: 0 , __v:0}) 
    return [response]
}
module.exports={
    isDataExists,
    addToMongoDb ,
    encryptPassword ,
    jwtToken,
    verifyPassword,
    verifyToken,
    isExistsById
}