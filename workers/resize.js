const sharp = require("sharp");
const fs = require("fs");
/**
 * This function resizes given file in given directory to the given width and height
 * @param  {String} fileDir - Absolute directory of a file
 * @param  {String} fileName - File name
 * @param  {Number} width - width in pixels
 * @param  {Number} height - height in pixels
 */
const resize = async (fileDir, fileName, width, height) => {
  console.log("Resizing");
  // input file
  let input = fs.readFileSync(`${fileDir}/${fileName}`);

  await sharp(input)
    .resize({ width: width, height: height })
    .toFile(`${fileDir}/resized_${fileName}`);
};

module.exports = { resize };
