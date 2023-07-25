const express = require("express");
const mariadb = require("mariadb");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const authentication = express.Router();
const { ensureToken } = require("../authMethods/index");
const ExecuteQuery = require("../dbConnection/index");
authentication.post("/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ir"] },
      })
      .required(),
    password: Joi.string().min(3).max(50).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }
  const queryRes = await ExecuteQuery(`SELECT * FROM customers
WHERE email = '${validation.value.email}' AND password = '${validation.value.password}'`);

  console.log(queryRes[0].email);
  const token = jwt.sign(
    {
      email: queryRes[0].email,
    },
    "this-is-a-secret",
    {
      expiresIn: "24h",
    }
  );
  await res.json({
    token: token,
  });
});

authentication.post("/register", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ir"] } })
      .required(),
    password: Joi.string().min(3).max(50).required(),
    name: Joi.string(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const pool = mariadb.createPool({
    host: "aberama.iran.liara.ir",
    user: "root",
    password: "zrCFSSXAVz52FVParRyTbWi6",
    connectionLimit: 5,
    port: 33121,
    database: "ecommerce_db",
  });

  let conn = await pool.getConnection();
  try {
    let queryRes = await conn.query(`insert into 
  customers (
    name, 
    email, 
    password
  )
values
  (   
    '${validation.value.name}', 
    '${validation.value.email}', 
    '${validation.value.password}'
  );`);
    console.log(queryRes.affectedRows);
    res.status(201).send("user createed try logging in now !");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.sqlMessage);
  }
});

authentication.get("/getClaims", ensureToken, (req, res) => {
  jwt.verify(req.token, "this-is-a-secret", function (err, data) {
    if (err) {
      res.status(403).send("unAuthorized");
    } else {
      res.json({
        data,
      });
    }
  });
});
module.exports = authentication;
