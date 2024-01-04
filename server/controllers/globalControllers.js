const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



const isDataExists = async(email ,schema)=>{
    const response = await schema.find({email:email})
    return response
 
}

const addToMongoDb = async (info, schema) => {
    const db = new schema(info)
    const addedData = await db.save()   
    //To exclude a specific field you can leverage Mongoose's projections feature.
    const response = await schema.find({_id:addedData._id},{ password: 0, createdAt: 0, updatedAt: 0 , __v:0})   
    return response
}

const encryptPassword = async(plainPassword)=>{
        const result = await bcrypt.hash(plainPassword,10);
        return result    
}


const jwtToken = async (data)=>{
    const token = jwt.sign(data , process.env.secrectKey ,{expiresIn:"1d"})
    return token   
}


module.exports={isDataExists , addToMongoDb , encryptPassword , jwtToken}