const express = require("express");
const router = express.Router();
const ExecuteQuery = require("../dbConnection");
const Joi = require("joi");
const courses = [
  { id: 1, name: "item1" },
  { id: 2, name: "item2" },
  { id: 3, name: "item3" },
];
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

router.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
});

router.put("/:id", (req, res) => {
  const courseIndex = courses.findIndex(
    (course) => course.id === parseInt(req.params.id)
  );
  if (courseIndex >= 0) {
    res.status(404).send("invalid id");
    return;
  }
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const validateRes = schema.validate(req.body);
  if (validateRes.error) {
    res.status(400).send(validateRes.error.message);
    return;
  } else {
    res.status(200);
    return;
  }
});

module.exports = router;
