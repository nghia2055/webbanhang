const express = require("express");
const { register } = require("../../controller/register");
const routeRegisterUser = express.Router();

routeRegisterUser.post("/", register);

module.exports = { routeRegisterUser };
