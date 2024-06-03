const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3001
const methodOverride = require("method-override")

const Product = require("./models/product")

const categories = ["fruit" ,"vegetable" , "dairy"]

app.set("views", `${__dirname}/views`)
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
mongoose.connect("mongodb://localhost:27017/productstore")
      .then(() => console.log("database connection success"))
      .catch(err => console.log("database connection error", err))


app.get("/products", async (req,res) => {
      const products = await Product.find()
      res.render("./products/index", {products})
})
app.get("/products/new", (req,res) => {
      res.render("./products/new",{categories})
})
app.get("/products/categories/:cat", async (req,res) => {
      const {cat} =req.params
      const products = await Product.find({category: cat})
      console.log(products)
      res.render("./products/index", {products})
})
app.get("/products/:id/edit", async(req,res) => {
      const {id} = req.params;
      const product = await Product.findById(id)
      console.log(product)
      res.render("./products/edit", {product, categories})
})
app.get("/products/:id", async (req,res) => {
      const {id} = req.params;
      const product = await Product.findById(id)
      res.render("./products/show", {product})
})
app.post("/products", async (req,res) => {
      const newProduct = new Product(req.body)
      await newProduct.save()
      res.redirect(302, `/products/${newProduct.id}`)
})
app.put("/products/:id", async (req, res) => {
      const {id} = req.params
      await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
res.redirect(`/products/${id}`)
})
app.delete("/products/:id", async (req,res) => {
      const { id } = req.params
      const deleted = await Product.findByIdAndDelete(id)
      res.redirect("/products")
})

app.listen(port, () => console.log(`app listening on: http://localhost:${port}`))