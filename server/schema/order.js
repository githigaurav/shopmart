const {mongoose, Schema}= require("mongoose")

const orderSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    userOrderList:{
        type:Array,
        default:[]
    }
},
{timestamps:true},
{collection:'order'}
)


const Order = mongoose.model('Order', orderSchema)
module.exports=Order