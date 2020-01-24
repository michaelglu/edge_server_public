const { Renderable } = require("./../../models/renderable.js");
const { extractFileName } = require("./../../config/fileManager.js");
const { mongoose } = require("./../../config/mongoose.js");
const fs = require("fs");

const deleteRenderableKey = (renderableId, key) => {
  return new Promise((resolve, reject) => {
    console.log("ID:" + renderableId);
    Renderable.findById(renderableId).then(
      renderable => {
        if (!renderable) {
          reject({ message: "not found" });
        } else {
          if (!renderable.filePaths.get(key)) {
            reject("key doesn't exist");
          } else {
            deleteFile(renderable.filePaths.get(key));
            renderable.set(`filePaths.${key}`, null);
            renderable.save().then(
              () => {
                resolve({
                  message: "File deletes, new map is below",
                  fileMap: renderable.filePaths
                });
              },
              error => {
                reject(error);
              }
            );
          }
        }
      },
      error => reject({ message: error })
    );
  });
};

const deleteFile = filePath => {
  const fileName = extractFileName(filePath);
  fs.unlink(__dirname + "/../../3dmodels/" + fileName, err => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = { deleteFile, deleteRenderableKey };
