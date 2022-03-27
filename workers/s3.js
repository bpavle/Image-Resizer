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

const uploadFile = (fileDir, fileName) => {
  const filenameArr = fileName.split(".");
  //const fileExt = filenameArr[filenameArr.length - 1];
  console.log("Reading file");
  const fileStream = fs.readFileSync(`${fileDir}/${fileName}`);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
    Tagging: "public=yes",
  };
  console.log("uploading");
  return s3.upload(uploadParams).promise(); // this will upload file to S3
};
(async () => {
  console.log(
    await uploadFile("./public/images", "resized_0001648345625736.png")
  );
})();
module.exports = { getImageByKey, uploadFile };
