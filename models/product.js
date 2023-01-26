const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    expiryDate: String,
    location: String,
    description: String
})

module.exports = mongoose.model("Product", ProductSchema);