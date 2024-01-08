const {mongoose , Schema}= require("mongoose")


const userSchema = new mongoose.Schema({
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
        required:[true, "Password is required"]
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
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:'Order'
        }
    ]
},
{timestamps:true},
{collection:'user'})

const User = mongoose.model("User", userSchema)

module.exports=User