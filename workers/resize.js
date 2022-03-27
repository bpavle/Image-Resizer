const sharp = require("sharp");
const fs = require("fs");
/**
 * This function resizes given file in given directory to the given width and height
 * @param  {String} fileDir - Absolute directory of a file
 * @param  {String} fileName - File name
 * @param  {Number} width - width in pixels
 * @param  {Number} height - height in pixels
 */
const resize = (fileDir, fileName, width, height) => {
  console.log("Resizing");
  // input stream
  let inStream = fs.createReadStream(`${fileDir}/${fileName}`);

  // output stream
  let outStream = fs.createWriteStream(`${fileDir}/resized_${fileName}`, {
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
