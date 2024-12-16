const express = require("express");
const { footer } = require("../../controller/footer");

const routefooter = express.Router();

routefooter.get("/footer", footer.getslugfooter);
routefooter.get("/getfooter", footer.getfooter);

module.exports = { routefooter };
