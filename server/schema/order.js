const {mongoose, Schema}= require("mongoose")

const orderSchema = new mongoose.Schema({
    
},
{timestamps:true},
{collection:'order'})


const Order = mongoose.model('Order', orderSchema)
module.exports=Order