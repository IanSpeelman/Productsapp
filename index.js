const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3001
app.set("views", `${__dirname}/views`)
app.set("view engine", "ejs")
mongoose.connect("mongodb://localhost:27017/productstore")
      .then(() => console.log("database connection success"))
      .catch(err => console.log("database connection error", err))



app.listen(port, () => console.log(`app listening on: http://localhost:${port}`))