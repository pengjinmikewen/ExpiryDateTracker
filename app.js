const express = require("express");
const app = express();
const path = require("path");
const Product = require("./models/product");

const mongoose = require("mongoose");

const methodOverride = require("method-override");

main().catch(err => {
    console.log("Error with database connection!");
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/ExpiryDateTracker");
    console.log("Database connected!")
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// For CSS
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home");
});

// Return products in sorted order based on expiryDate
app.get("/products", async (req, res) => {
    const products = await Product.find().sort({ expiryDate: 1 });
    // Get current date
    let date = new Date();
    let year = date.getFullYear();

    let month = date.getMonth() + 1; // getMonth() is 0 indexed, so add 1
    
    let day = date.getDate();

    // Get the days in current month
    let totalDaysInCurrentMonth = new Date(year,month,0).getDate();

    res.render("products/index", { products, year, month, day, totalDaysInCurrentMonth });
});

// Cooking ideas route
app.get("/products/cook", async (req, res) => {
    const products = await Product.find().sort({ expiryDate: 1 });
    // Get current date
    let date = new Date();
    let year = date.getFullYear();

    let month = date.getMonth() + 1; // getMonth() is 0 indexed, so add 1
    
    let day = date.getDate();

    // Get the days in current month
    let totalDaysInCurrentMonth = new Date(year,month,0).getDate();

    res.render("products/cook", { products, year, month, day, totalDaysInCurrentMonth });
});


/*
app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.render("products/index", { products });
});
*/

app.get("/products/new", (req, res) => {
    res.render("products/new");
});

app.post("/products", async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`);
});

app.get("/products/:id", async(req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product });
})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
    res.redirect(`/products/${product._id}`);
})

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
});