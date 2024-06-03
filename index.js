const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3001

const Product = require("./models/product")
app.set("views", `${__dirname}/views`)
app.set("view engine", "ejs")
mongoose.connect("mongodb://localhost:27017/productstore")
      .then(() => console.log("database connection success"))
      .catch(err => console.log("database connection error", err))


app.get("/products", async (req,res) => {
      const products = await Product.find()
      res.render("./products/index", {products})
})
app.get("/products/:id", async (req,res) => {
      const {id} = req.params;
      const product = await Product.findById(id)
      res.render("./products/show", {product})
})
app.listen(port, () => console.log(`app listening on: http://localhost:${port}`))