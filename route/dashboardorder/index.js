const express = require("express");
const dashboardOrder = require("../../controller/Products/dashboardOrder");

const routerDashboardOrder = express.Router();

routerDashboardOrder.get("/dashboardOrder", dashboardOrder);
module.exports = routerDashboardOrder;
