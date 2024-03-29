require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
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

// This seems like more elegant solution but I am not able to set tag public=yes and therefore cant access image ones in the bucket
// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: bucketName,
//     //FIXME: acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,

//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname, Tagging: "public=yes" });
//     },
//     key: function (req, file, cb) {
//       cb(null, "000" + Date.now().toString());
//     },
//     Tagging: "public=yes",
//   }),
// });

const dir = "./public/images";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

/**
 * Function for uploading file to s3 bucket
 * @param  {File} file multer file from req obj
 * @returns {Promise}
 */
const uploadFile = (file) => {
  const filenameArr = file.filename.split(".");
  const fileExt = filenameArr[filenameArr.length - 1];
  const fileStream = fs.readFileSync(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: "000" + Date.now().toString() + "." + fileExt,
    Tagging: "public=yes",
  };
  return s3.upload(uploadParams).promise(); // this will upload file to S3
};

/**
 * Function for deleting file from s3 bucket
 * @param  {String} fileKey key of the object that needs to be deleted from the bucket
 * //FIXME: I was unable to delete files from bucket using this one... Access denied!
 */
const deleteFile = (fileKey) => {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };
  s3.deleteObject(params, function (err, data) {
    if (err) console.error(err, err.stack);
    else console.log(data);
  });
};
/**
 * This function checks if object with given key exists in the bucket
 * @param  {String} key - Key of the file in s3
 * @returns {Promise} aws response
 */
const checkOnObject = (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  return s3.headObject(params).promise();
};

module.exports = { uploadFile, upload, deleteFile, checkOnObject };
