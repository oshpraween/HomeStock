const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes  = require('./routes/userRoutes')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db and listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
