const express = require("express");
const route = express.Router();

const ExecuteQuery = require("../dbConnection");
const { ensureToken } = require("../authMethods");

route.get("/customers", ensureToken, async (req, res) => {
  res.send(await ExecuteQuery("select * from ecommerce_db.products"));
});

route.get("/products/random/:count", async (req, res) => {
  //console.log;
  //res.send(await ExecuteQuery(`SELECT * FROM ecommerce_db.products WHERE id >= (SELECT FLOOR( MAX(id) * RAND()) FROM ecommerce_db.products ) LIMIT 0 , ${req.params.count}`));
  res.send(await ExecuteQuery(`SELECT * from products LIMIT 0 , 3`))
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
