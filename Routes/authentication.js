const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const authentication = express.Router();
const { ensureToken } = require("../authMethods/index");
authentication.post("/login", (req, res) => {
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
  const token = jwt.sign(req.body, "this-is-a-secret", { expiresIn: "1h" });
  res.json({
    token: token,
  });
});
authentication.get("/getProtected", ensureToken, (req, res) => {
  jwt.verify(req.token, "this-is-a-secret", function (err, data) {
    if (err) {
      res.status(403).send("unAuthorized");
    } else {
      res.json({
        data,
        token: jwt.decode(req.token),
      });
    }
  });
});
module.exports = authentication;
