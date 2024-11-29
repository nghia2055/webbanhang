const express = require("express");
const { product } = require("../../controller/product");
const routeProduct = express.Router();

const multer = require("multer");
const upload = multer();

routeProduct.post("/", upload.array("productImages"), product);

module.exports = { routeProduct };
