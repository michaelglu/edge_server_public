const { Renderable } = require("./../../models/renderable.js");
const { mongoose } = require("./../../config/mongoose.js");
// const { ObjectId } = require("mongodb");

const addModelFile = ({ renderableId, key, path }) => {
  return new Promise((resolve, reject) => {
    console.log("id query: " + renderableId);
    //findbyid and overwrite vs findOneAndUpdate
    Renderable.findById(renderableId).then(
      renderable => {
        console.log("id query: " + renderableId + "renderable:" + renderable);
        if (!renderable) {
          reject({ error: "no renderable found" });
        } else {
          renderable.set(`filePaths.${key}`, path);
          renderable.save().then(
            () => {
              resolve({ message: "renderable added successfully", path });
            },
            error => {
              reject({ error });
            }
          );
        }
      },
      error => {
        reject({ error });
      }
    );
  });
};
module.exports = { addModelFile };
