const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,

    },
    email: {
        type: String,

    },
    role: {
        type: String,
        enum: ["buyer", "seller", "superadmin"],
        default: "seller"
    },

})



const User = mongoose.model("User", userSchema)
module.exports = User