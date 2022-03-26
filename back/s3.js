require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// UPLOAD FILE TO S3
function uploadFile(file) {
  console.log("Reading file");
  const fileStream = fs.readFileSync(file);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file,
  };
  console.log("uploading");
  return s3.upload(uploadParams).promise(); // this will upload file to S3
}
module.exports = { uploadFile };
