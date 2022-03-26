const express = require("express");
const { uploadFile } = require("./s3");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../front/build")));

app.get("/api/v1/status", async (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/v1/upload-image", async (req, res) => {
  //const resp = await uploadFile("000000.png");
  console.log(req.body);
  res.json({ message: "Hello from server!" });
});
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../front/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
