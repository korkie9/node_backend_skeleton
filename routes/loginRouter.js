const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post("/", async (req, res) => {
    try{
        const username = req.body.username
        const password = req.body.password

        console.log(`logging in with ${username} pass: ${password} `)
        if(!password || !username) {
            return res.status(400).json({message: "username or password incorrect"})
        }
        const user = await User.findOne({username: username})
        if(!user) return res.status(400).json({message: "user doesn't exist"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: "Password is incorrect"})
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
        res.json({
            token,
            uid: user._id 
        })
    } catch(err){
        res.status(500).json({error: err.message})
        console.error(err)
    }
})

module.exports = router;