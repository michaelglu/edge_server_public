const { Renderable } = require("./../../models/renderable.js");
const { Image } = require("./../../models/augmentedImage.js");
const { extractFileName } = require("./../../config/fileManager.js");
const { mongoose } = require("./../../config/mongoose.js");
const renderableDeleter = require("./../renderables/delete.js");
const fs = require("fs");

const deleteImage = imageId => {
  return new Promise((resolve, reject) => {
    Image.findById(imageId).then(
      image => {
        if (!image) {
          reject({ message: "image not found" });
        } else {
          console.log("FOUND IMAGE:" + image.filePath);
          deleteFile(image.filePath);
          Renderable.findById(image.renderableId).then(
            renderable => {
              if (!renderable) {
                reject({
                  message: "renderable associated with image not found"
                });
              } else {
                renderable.filePaths.forEach((value, key, map) => {
                  console.log("key:" + key + " value" + value);
                  renderableDeleter.deleteFile(value);
                });
                Renderable.deleteOne({ _id: image.renderableId }).then(
                  () => {
                    Image.deleteOne({ _id: imageId }).then(
                      () => {
                        resolve("image deleted");
                      },
                      error => reject(error)
                    );
                  },
                  error => reject({ message: error })
                );
              }
            },
            error => reject(error)
          );
        }
      },
      error => reject(error)
    );
  });
};

const deleteFile = filePath => {
  const fileName = extractFileName(filePath);
  fs.unlink(__dirname + "/../../images/" + fileName, err => {
    if (err) {
      console.log(err);
    }
  });
};
module.exports = { deleteImage };
