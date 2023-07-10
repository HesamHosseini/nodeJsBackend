const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const authentication = express.Router();

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
  res.json({
    text: "this is protected",
  });
});
module.exports = authentication;

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
