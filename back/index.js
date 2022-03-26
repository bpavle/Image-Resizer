const express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, upload, deleteFile } = require("./s3");
const { sendMessageToQueue } = require("./sqs");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../front/build")));

app.get("/api/v1/status", async (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/v1/upload-image", upload.single("image"), async (req, res) => {
  try {
    const aws_resp = await uploadFile(req.file);
    await sendMessageToQueue(req.body.size, aws_resp.key);
    setTimeout(() => {
      //TODO: delete image after 5 minutes from s3 bucket
      //BUG: Access denied
      deleteFile(data.key);
    }, 60 * 1000);
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
