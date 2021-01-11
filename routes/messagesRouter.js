const router = require('express').Router()
const Message = require('../models/message')
const auth = require('../middleware/auth')

router.post("/", async (req, res, _next) => {
  try{
    const message = new Message({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      company: req.body.company,
      message: req.body.message
    });
    await message.save()
    console.log(message);  ///
    res.status(201).json(message);
  } catch(err) {
    console.log(err.message)
    res.status(500).json({ message: "internal server error"})
  }
  });


router.get("/", auth, async (_req, res, _next) => {
  try{
    const messages = await Message.find().then( docs => {
      res.status(201).json(docs)
    });
  } catch(error){
    console.log(error.message) ///
    res.status(500).json({message: "internal error"})
  }
});

router.delete("/", auth, async (req, res, _next) => {
  try{
    const message = await Message.findByIdAndDelete(req.body.id)
    res.status(201).json(message)
  } catch(error){
    console.log(error.message) ///
    res.status(500).json({message: "internal error"})
  }
});

module.exports = router;