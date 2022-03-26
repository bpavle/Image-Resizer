const express = require("express");
var path = require("path");
const app = express();
const port = 9000;

app.use(express.static(path.resolve(__dirname, "../front/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../front/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});