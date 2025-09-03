const { string } = require("joi")
const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    
})
const User=mongoose.model("User",UserSchema)

module.exports={
    User
}

