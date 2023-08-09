const express = require("express");
const route = express.Router();

const ExecuteQuery = require("../dbConnection");
const { ensureToken } = require("../authMethods");

route.get("/customers", ensureToken, async (req, res) => {
  res.send(await ExecuteQuery("select * from ecommerce_db.products"));
});

route.get("/products/random/:count", async (req, res) => {
  //console.log;
  res.send(req.params.count);
});
route.get("/category/top5", async (req, res) => {
  res.send(
    await ExecuteQuery(
      "select name , description , `Image` from categories  LIMIT 0,5;"
    )
  );
});
// route.get("/customers", async (req, res) => {
//   res.send(await ExecuteQuery("select * from ecommerce_db.products"));
// });
module.exports = route;
