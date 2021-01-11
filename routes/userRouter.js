const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post("/", async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        const user = new User({
            username: req.body.username,
            password: passwordHash
        })
        const newUser = await user.save()

        res.json(newUser)
    } catch(error) {
        res.status(500).json({error: error.message})
        console.err(error)
    }
})

module.exports = router;