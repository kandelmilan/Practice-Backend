const User = require("../model/User.model")
const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signupSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.min": "Username must be at least 3 characters",
            "string.max": "Username cannot be longer than 30 characters"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format"
        }),

    password: Joi.string()
        .min(6)
        .max(100)
        // .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
            // "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }),

    role: Joi.string()
        .valid("buyer", "seller", "superadmin")
        .default("buyer")
        .messages({
            "any.only": "Role must be either buyer, seller, or superadmin"
        }),
});



const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format"
        }),

    password: Joi.string()
        .min(6)
        .max(100)
        // .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }),
})

const login = async (req, res) => {

    try {
        const loginData = req.body
        const { error, value } = loginSchema.validate(loginData)
        const user = await User.findOne({ email: value.email })
        if (!user) {
            res.status(200).send({ message: "wrong Input" })

            return
        }
        const matched = await bcrypt.compare(value.password, user.password)

        if (!matched) {
            res.status(200).send({ status: "success", message: "Wrong Creditential", data: [] })
            return
        } else {
            const userObject = user.toObject()
            delete userObject.password
            const token = jwt.sign(userObject, process.env.JWT_SECRET)
            res.status(200).send({ status: "sucess", message: "User Logedin successfuly", data: { token, userObject } })

        }

    } catch (err) {
        console.log(err)
    }
}



const signup = async (req, res) => {
    const data = req.body
    try {
        const { error, value } = signupSchema.validate(data, {
            allowUnknown: true,
            abortEarly: false
        })
        if (!error) {
            let saltRounds = 10
            const hash = bcrypt.hashSync(value.password, saltRounds)
            const user = await User.create({ ...value, password: hash })
            let userObject = user.toObject()
            delete userObject.password
            console.log(userObject)
            res.status(200).send(userObject)

        } else {
            throw error
        }
        res.status(200).send("User successfully created")
    } catch (err) {
        res.send(err)
    }
}

module.exports = {
    login, signup
}