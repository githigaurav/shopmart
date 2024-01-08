const {mongoose , Schema} = require("mongoose")

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Product name is required"],
    },
    brand:{
        type:String,
        required:[true, "brand name is required"],
    },
    price:{
        type:Number,
        required:[true, "Price is required"]
    },
    category:{
        type:String,
        required:[true, "Category is required"],
    },
    subCategory:{
        type:String,
        required:[true, "Sub Category is required"],
    },
    returnPolicy:{
        type:String,
        required:[true, "Return policy is required"],
    },
    warranty:{
        type:String,
        required:[true, "Warranty is required"],
    },
    paymentMethod:{
        type:String,
        required:[true, "Payment Mode is required"],
    },
    discount:{
        type:String,
        required:[true, "Discount is required"],
    },
    quantity:{
        type:String,
        required:[true, "Quantity is required"],
    },
    discription:{
        type:String,
        required:[true, "Product discription is required"],
    },
    file:{
        type:String,
        required:[true, "file url is required"],
    }

},
{timestamps:true},
{collection:'product'})

const Product = mongoose.model("Product", productSchema)
module.exports=Product