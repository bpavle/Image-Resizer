const { getNextTask } = require("./sqs");
const { getImageByKey, uploadFile } = require("./s3");
const { resize } = require("./resize");
const util = require("util");

const fs = require("fs");
const { exit } = require("process");
const unlinkFile = util.promisify(fs.unlink);

(async () => {
  var dir = `${__dirname}/public/images`;
  try {
    const [key, size] = await getNextTask();
    console.log(`Key:${key}, size:${size}`);
    const image = await getImageByKey(key);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dir + `/${key}`, image);

    const [width, height] = size.split("x").map(Number);
    await resize(dir, key, width, height);
    await uploadFile(dir, `resized_${key}`);
    unlinkFile(dir + `/${key}`);
    unlinkFile(dir + `/resized_${key}`);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === "(intermediate value) is not iterable"
    ) {
      console.log("Error while getting empty task. No big deal");
      exit(0);
    }
    if (key) {
      fs.copyFileSync(
        "./public/images/error_image.png",
        "./public/images/error_image_copy.png"
      );
    }
    fs.renameSync(
      "./public/images/error_image_copy.png",
      `./public/images/resized_${key}.png`
    );
    await uploadFile(dir, `resized_${key}`);
    unlinkFile(dir + `/resized_${key}`);

    console.error(
      "Error occurred! Uploading error image with same key as would resized original have."
    );
  }
})();

//TODO: Remove original from s3 (this can probably be done by uploading file with same key as original.)
//TODO: Run this in interval or similar...
