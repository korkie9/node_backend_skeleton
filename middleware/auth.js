const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token)
      return res.status(400).json({ message: 'No authentication token' })
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified)
      return res.status(400).json({ message: 'verification token denied' })
    req.body.id = verified.id
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
  next()
}

module.exports = auth
