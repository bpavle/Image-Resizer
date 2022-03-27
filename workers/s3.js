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
 * @returns {Promise} Image Object as aws request
 */
const getImageByKey = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  const obj = await s3.getObject(params).promise();
  var dir = "./public/images";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dir + `${key}`, obj.Body);
};

module.exports = { getImageByKey };
