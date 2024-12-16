const express = require("express");

const order = require("../../controller/order/index");
const routerOrder = express.Router();
const multer = require("multer");
const upload = multer();

routerOrder.post("/order", upload.none(), order);

module.exports = routerOrder;
