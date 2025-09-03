const express = require("express")
const { login, signup } = require("../controller/user.controller")
const { isAdmin, isAuthenticated } = require("../middleware/auth")
const router = express.Router()

router.get("/user", (req, res) => {
    res.status(200).send("response from user")
})



router.post("/user/login", login)
router.post("/user/signup", signup)

router.patch("/user/:id", isAuthenticated, (req, res) => {
    console.log("hello form update")
    res.send("User updated")
})


// router.delete("/user/:id", () => { }

// )

module.exports = router