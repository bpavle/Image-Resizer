require("dotenv").config();

const aws = require("aws-sdk");

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sqsSuccessUrl = process.env.AWS_SUCCESS_QUEUE_URL;

/**
 * Function for getting next task from aws sqs queue
 * @returns {Promise} array [key,size]
 */
const getNextTask = async () => {
  try {
    const sqs = new aws.SQS({ region, accessKeyId, secretAccessKey });
    var params = {
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ["All"],
      QueueUrl: sqsSuccessUrl,
      WaitTimeSeconds: 20,
    };

    const { Messages } = await sqs.receiveMessage(params).promise();
    if (Messages) {
      const attributes = Messages[0].MessageAttributes;
      return [attributes.Key.StringValue, attributes.Size.StringValue];
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getNextTask };
