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
const port = process.env.PORT || 3000;

app.listen(port, () => {

  console.log(`listening on port ${port} ....`);
});
