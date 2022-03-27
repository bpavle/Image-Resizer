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
  await resize(dir, key, width, height);
  await uploadFile(dir, `resized_${key}`);
  unlinkFile(dir + `/${key}`);
  unlinkFile(dir + `/resized_${key}`);
})();

//TODO: Remove original from s3 (this can probably be done by uploading file with same key as original.)
//TODO: Run this in interval or similar...
