const {mongoose , Schema, mongo} = require("mongoose")

const sellerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:[true, "Email is already exists"],
        validate:{
            validator:function(value){
                const gmailRegex = /^[\w._%+-]+@gmail\.com$/;
                return gmailRegex.test(value)
            },
            message:"Valid email is required"
        }
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    info:{
        name:{
            type:String,
            default:''
        },
        phone:{
            type:Number,
            default:0
        }

    },
    companyInfo:{
        companyName:{
            type:String,
            default:''
        },
        gstNo:{
            type:String,
            default:''
        },
        companyAddress:{
            type:String,
            default:''
        },
        bankDetails:{
            bankName:{
                type: String,
            },
            ifsc:{
                type:String
            },
            accountNumber:{
                type:Number
            }
        }
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    orders:[
        {
        type: Schema.Types.ObjectId, 
        ref: 'Order'
        }
    ],
    accountStatus:{
        type:String,
        enum:{
            values:["Pending","Approved","Suspended"],
            default:"Approved"
        }
    }
},
{timestamps:true},
{collection:'seller'})

const Seller = mongoose.model('Seller', sellerSchema)

module.exports=Seller
