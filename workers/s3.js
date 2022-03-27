require("dotenv").config();

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

/**
 * Get image from s3 and write it to the ./public/images directory
 * @param  {String} key
 * @returns {Promise} Image Object
 */
const getImageByKey = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  const obj = await s3.getObject(params).promise();
  return obj.Body;
};
/**
 * Function for uploading file to the s3 bucket
 * @param  {String} fileDir - Absolute directory of a file
 * @param  {String} fileName - File name
 * @returns {Promise} Promise aws request
 */
const uploadFile = (fileDir, fileName) => {
  const fileStream = fs.readFileSync(`${fileDir}/${fileName}`);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
    Tagging: "public=yes",
  };
  return s3.upload(uploadParams).promise(); // this will upload file to S3
};
module.exports = { getImageByKey, uploadFile };
