const express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, upload, deleteFile, checkOnObject } = require("./s3");
const { sendMessageToQueue } = require("./sqs");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();
const port = 9000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../front/build")));

//TODO: This could be socket ?
app.get("/api/v1/status/:key", async (req, res) => {
  try {
    const aws_resp = await checkOnObject(req.params.key);
    // if (aws_resp.code && aws_resp.code == 404)
    //   throw new Error(`File with key:${key} not found on the bucket`);
    res.json({ status: "success", data: aws_resp });
  } catch (error) {
    console.log("error, no such file");
    res.json({ status: "error", data: error });
  }
});

app.post("/api/v1/upload-image", upload.single("image"), async (req, res) => {
  try {
    const aws_resp = await uploadFile(req.file);
    await sendMessageToQueue(req.body.size, aws_resp.key);
    unlinkFile(req.file.path);
    res.json({ status: "success", data: aws_resp });
  } catch (error) {
    res.json({ status: "error", data: null });
  }
});
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../front/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
