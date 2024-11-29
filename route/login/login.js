const express = require("express");
const { login } = require("../../controller/login");

const routeLogin = express.Router();

routeLogin.post("/", login);

module.exports = { routeLogin };
