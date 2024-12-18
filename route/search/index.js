const express = require("express");
const Search = require("../../controller/Products/search");

const routerSearch = express.Router();

routerSearch.get("/searchMenu/:id", Search);

module.exports = routerSearch;
