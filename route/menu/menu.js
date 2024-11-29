const express = require("express");
const { Menu } = require("../../controller/menu");

const routeMenu = express.Router();

routeMenu.post("/", Menu.addCollection);
routeMenu.get("/add", Menu.getCollection);

module.exports = { routeMenu };
