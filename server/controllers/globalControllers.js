const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const path = require("path")
const cloudinary = require('cloudinary').v2; 
const fs = require('fs')

const isDataExists = async(email ,schema)=>{
    const response = await schema.find({email:email})
    return response //[]
}

const addToMongoDb = async (info, schema) => {
    const db = new schema(info)
    const addedData = await db.save()   
    //To exclude a specific field you can leverage Mongoose's projections feature.
    // const response = await schema.find({_id:addedData._id},{ password: 0, createdAt: 0, updatedAt: 0 , __v:0})   
    return addedData
}

const encryptPassword = async(plainPassword)=>{
        const response = await bcrypt.hash(plainPassword,10);
        return response    
}


const jwtToken = async (data, key)=>{
    const token = jwt.sign(data , key ,{expiresIn:"1d"})
    return token   
}

const verifyPassword = async(password, hash)=>{    
    const response = await bcrypt.compare(password , hash);
    return response    
}

const verifyToken = async (token ,key )=>{
    const response = jwt.verify(token, key)
    return response
}

const isExistsById=async (id , schema)=>{
    const response = await schema.findById(id,{ password: 0, createdAt: 0, updatedAt: 0 , __v:0}) 
    return [response]
}

const uploadToCloud = async (req) => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRECT,
    });
    
    const filePath = path.join(__dirname, "./../tempImg")
    const response = await cloudinary.uploader.upload(`${filePath}/${req.file.filename}`, { folder: 'ECommerce' })
    console.log(response +  "responsse")
    console.log("File has been  uploaded successfully")
    fs.unlinkSync(`${filePath}/${req.file.filename}`)
    console.log("File has been deleted")
    return response    
}
module.exports={
    isDataExists,
    addToMongoDb ,
    encryptPassword ,
    jwtToken,
    verifyPassword,
    verifyToken,
    isExistsById,
    uploadToCloud
}