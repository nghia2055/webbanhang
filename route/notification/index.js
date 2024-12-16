const express = require("express");
const notification = require("../../controller/notification");

const routerNotification = express.Router();

routerNotification.post("/notification", notification);

module.exports = routerNotification;
