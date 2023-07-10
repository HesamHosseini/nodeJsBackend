const Joi = require("joi");
const express = require("express");
const app = express();
const courses = require("./Routes/courses");
const store = require("./Routes/store");
const authentication = require("./Routes/Authentication");

app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/store", store);
app.use("/api/authentication", authentication);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`listening on port ${port} ....`);
});
