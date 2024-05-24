const express = require("express");
const app = express();
const courses = require("./Routes/courses");
const store = require("./Routes/store");
const store2 = require("./Routes/store2");
const authentication = require("./Routes/authentication");
const { ensureToken } = require("./authMethods");

app.use(express.json());
app.use("/api/courses", ensureToken, courses);
app.use("/api/store", store);
app.use("/api/store2", store2)
app.use("/api/authentication", authentication);
app.get("/", function (req, res) {
  res.send("hi");
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on   ....`);
});

module.exports = app;
