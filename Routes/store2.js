const express = require("express");
const route = express.Router();

const ExecuteQuery = require("../dbConnection");


route.get("/products", async (req, res) => {

  res.send(await ExecuteQuery(`SELECT * FROM ecommerce_db.products`));
});

route.get("/products/:id", async (req, res) => {
  //console.log;
  res.send(await ExecuteQuery(`SELECT * FROM ecommerce_db.products WHERE id = ${req.params.id}`));
});

route.post("/login", async (req, res) => {

  const credentials = req.body
  if (credentials.username === 'maksaUser' && credentials.password === '1234') {
    return res.sendStatus(200)
  } else {
    return res.sendStatus(401)
  }
})


// route.get("/category/top5", async (req, res) => {
//   res.send(
//     await ExecuteQuery(
//       "select name , description , `Image` from categories  LIMIT 0,5;"
//     )
//   );
// });


// route.get("/customers", async (req, res) => {
//   res.send(await ExecuteQuery("select * from ecommerce_db.products"));
// });
module.exports = route;
