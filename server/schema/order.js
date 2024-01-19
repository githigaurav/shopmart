const {mongoose, Schema}= require("mongoose")

const orderSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user'
        },
    userOrderList:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                require:[true, 'Quantity is required']
            },
            paymentStatus:{
                type:String,
                enum:["pending","successfully"],
                default:'pending'
            },
            orderStatus:{
                type:String,
                enum:["accepted","rejected","pending","inprocess","shipped","dispatched"],
                default:"pending"
            },
            deliveryAddress:{
                
                houseNo:{
                    type:String,
                    default:''
                },
                location:{
                    type:String,
                    default:''
                },
                city:{
                    type:String,
                    default:''
                },
                state:{
                    type:String,
                    default:''
                },
                pinCode:{
                    type:String,
                    default:''
                }

            }         
        }
    ]
},
{timestamps:true},
{collection:'order'}
)


const Order = mongoose.model('Order', orderSchema)
module.exports=Order