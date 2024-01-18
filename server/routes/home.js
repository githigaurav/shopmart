const home = require("express").Router()
// importing utils
const ApiResponse = require('./../utilis/apiResponse')
const tryCatch = require('./../utilis/tryCatch')

// importing DB
const{Seller,Product, Order} = require("../schema/index")

// importing global controllers
const{
    isDataExists,
    addToMongoDb,
    encryptPassword,
    jwtToken,
    verifyPassword,
    isExistsById,
    uploadToCloud
}= require("./../controllers/globalControllers")





home.get("/products", tryCatch(async(req, res)=>{
    // const findProducts = await Seller.findById("65a68d1c75438ff55dfbdbc5").populate("products")
    const response = await Seller.aggregate([
        {
            $project: {
              products: 1,
              _id:0
            },
          },
          {
            $unwind: '$products',
          },
          {
            $lookup: {
              from: 'products', // Assuming your product collection is named 'products'
              localField: 'products',
              foreignField: '_id',
              as: 'result',
            },
          },
          {
                $project: {
                  products:0
                }
          },
          {
            $unwind:"$result"
          },
          
          {
            $group: {
              _id: null,
              productsList: {
                 $addToSet: '$result',
              }
            }
          }
    ])
    // console.log(response[0].productsList.length)
    // ApiResponse.success(findProducts?.products, "Data get successfully",200).send(res)
    ApiResponse.success(response[0]?.productsList || [], "Data get successfully",200).send(res)
}))


module.exports=home
