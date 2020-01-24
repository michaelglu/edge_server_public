const extractFileName = filePath => {
  let index = -1;
  for (let i = 0; i < filePath.length; i++) {
    if (filePath.charAt(i) == "/") {
      index = i;
    }
  }
  console.log("index:" + index);
  console.log(filePath.substring(index + 1));
  return filePath.substring(index + 1);
};
module.exports = { extractFileName };
