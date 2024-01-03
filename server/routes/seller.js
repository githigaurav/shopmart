const seller=require("express").Router()
const {tryCatch , ApiResonse}= require("./../utilis/index")

seller.post("/signup", tryCatch(async(req, res)=>{
    console.log(req.body)
    res.status(200).json("Successfully login")
}))
seller.post("/login", tryCatch(async(req,res)=>{
   res.status(200).json("Successfully login")
}))
seller.get("/dashboard", tryCatch(async(req,res)=>{
    
}))
seller.post("/addproduct", tryCatch(async(req,res)=>{
    
}))






















module.exports=seller