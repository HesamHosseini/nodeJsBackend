const express = require("express");
const app = express();
const courses = require("./Routes/courses");
const store = require("./Routes/store");
const authentication = require("./Routes/Authentication");
const { ensureToken } = require("./authMethods");

app.use(express.json());
app.use("/api/courses", ensureToken, courses);
app.use("/api/store", store);

app.use("/authentication", authentication);
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(port);
  console.log(`listening on port ${port} ....`);
});

module.exports = app;
