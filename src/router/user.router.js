const express=require("express")


router.get("/user",(req,res)=>{
    res.status(200).send("Response from user")
})

router.post("/user/login",(req,res)=>{
        res.status(200).send("Response from login")
})