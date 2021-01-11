const express = require('express')
const bodyParser = require("body-parser")
const Message = require("./models/message")
const User = require("./models/user")
const mongoose = require("mongoose")
const app = express();
require('dotenv').config()

//Routers//////////////////////////////////////
// const userRouter = require("./routes/userRouter")
const loginRouter = require("./routes/loginRouter")
const messagesRouter = require("./routes/messagesRouter")

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('server started');
  next();
})

mongoose
  .connect(
    process.env.CONNECTION_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log(err)
  });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS"
    );
    next();
  });
//Routers //////////////////////////////
// app.use("/api/users", userRouter); //comment out this route after use if no new users need to be added
app.use("/api/login", loginRouter);
app.use("/api/messages", messagesRouter);


//Test //////////////////////////////////////////
  app.get("/api/test", (_req, res) => {
    console.log('test success')
    res.status(201).json({message: "Test Success"})
  })

module.exports = app;