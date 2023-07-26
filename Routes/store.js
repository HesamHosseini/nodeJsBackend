const express = require("express");
const route = express.Router();

const ExecuteQuery = require("../dbConnection");
const { ensureToken } = require("../authMethods");

route.get("/customers", ensureToken, async (req, res) => {
  res.send(await ExecuteQuery("select * from ecommerce_db.products"));
});
// route.get("/customers", async (req, res) => {
//   res.send(await ExecuteQuery("select * from ecommerce_db.products"));
// });
module.exports = route;
