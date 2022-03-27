const sharp = require("sharp");
const fs = require("fs");

const resize = (fileDir, key, width, height) => {
  console.log("Resizing");
  // input stream
  let inStream = fs.createReadStream(fileDir);

  // output stream
  let outStream = fs.createWriteStream(`${fileDir}/resized_${key}`, {
    flags: "w",
  });

  // on error of output file being saved
  outStream.on("error", function () {
    console.log("Error");
  });

  // on success of output file being saved
  outStream.on("close", function () {
    console.log("Successfully saved file");
  });

  // input stream transformer
  // "info" event will be emitted on resize
  let transform = sharp()
    .resize({ width: width, height: height })
    .on("info", function (fileInfo) {
      console.log("Resizing done, file not saved");
    });

  inStream.pipe(transform).pipe(outStream);
};

module.exports = { resize };
