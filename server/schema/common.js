const {mongoose} = require("mongoose")

const commonSchema= {
    name:{
        type:String,
        required:[true, "Product name is required"],
    },
    brand:{
        type:String,
        required:[true, "brand name is required"],
    },
    category:{
        type:String,
        
        required:[true, "Category is required"],
    },
    subCategory:{
        type:String,
      
        required:[true, "Sub Category is required"],
    },
    discription:{
        type:String,
        required:[true, "Product discription is required"],
    },
    returnPolicy:{
        type:Number,
        required:[true, "Return policy is required"],
    },
    warranty:{
        type:Number,
        required:[true, "Warranty is required"],
    },
    quantity:{
        type:Number,
        required:[true, "Quantity is required"],
    },
    discount:{
        type:Number,
        required:[true, "Discount is required"],
    },
    price:{
        type:Number,
        required:[true, "Price is required"]
    },     
    paymentMethod:{
        type:String,
        required:[true, "Payment Mode is required"],
    },  
    file:{
        type:String,
        required:[true, "file url is required"],
    },
    seller:{
        type:Schema.Types.ObjectId,
        ref:'Seller'
    }

}

module.exports=commonSchema
