require("dotenv").config();
var multer = require("multer");
var multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    //FIXME: acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname, Tagging: "public=yes" });
    },
    key: function (req, file, cb) {
      cb(null, "000" + Date.now().toString());
    },
    Tagging: "public=yes",
  }),
});

// UPLOAD FILE TO S3
function uploadFile(file) {
  console.log("Reading file");
  const fileStream = fs.readFileSync(file);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "000" + file,
    Tagging: "public=yes",
  };
  console.log("uploading");
  return s3.upload(uploadParams).promise(); // this will upload file to S3
}
module.exports = { uploadFile, upload };
