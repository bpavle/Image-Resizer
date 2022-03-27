const { getNextTask } = require("./sqs");
const { getImageByKey, uploadFile } = require("./s3");
const { resize } = require("./resize");
const util = require("util");

const fs = require("fs");
const unlinkFile = util.promisify(fs.unlink);

(async () => {
  const [key, size] = await getNextTask();
  const image = await getImageByKey(key);

  var dir = `${__dirname}/public/images`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dir + `/${key}`, image);

  const [width, height] = size.split("x").map(Number);
  resize(dir, key, width, height);
  unlinkFile(dir + `/${key}`);
  await uploadFile(dir, key);
})();

//TODO: Remove original from s3 (this can probably be done by uploading file with same key.)
