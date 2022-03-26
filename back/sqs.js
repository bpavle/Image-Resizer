require("dotenv").config();

const SQS = require("aws-sdk/clients/sqs");

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sqsSuccess = process.env.AWS_SQS_NAME;
const sqsSuccessUrl = process.env.AWS_SUCCESS_QUEUE_URL;

const sqs = new SQS({ region, accessKeyId, secretAccessKey });

//Get queue url
const getQueueUrl = async () => {
  return sqs
    .getQueueUrl({
      QueueName: sqsSuccess,
    })
    .promise();
};

/**
 * Send message to queue
 * @param  {String} size like 1920x1080
 * @param  {String} key
 * @returns {Promise}
 */
const sendMessageToQueue = (size, key) => {
  const params = {
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "Task",
      },
      Size: {
        DataType: "String",
        StringValue: size,
      },
      Key: {
        DataType: "String",
        StringValue: key,
      },
    },
    MessageBody: "Some message body",
    QueueUrl: sqsSuccessUrl,
  };

  return sqs.sendMessage(params).promise();
};

(async () => {
  await sendMessageToQueue();
})();

module.exports = { getQueueUrl, sendMessageToQueue };
