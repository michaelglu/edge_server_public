const { Image } = require("./../../models/augmentedImage.js");
const { Renderable } = require("./../../models/renderable.js");
const { ObjectId } = require("mongodb");

const createImage = ({ imageFilePath, userId }) => {
  return new Promise((resolve, reject) => {
    console.log("Fired");
    const renderable = new Renderable();
    console.log("Renderable made");
    renderable.save().then(
      () => {
        console.log("Renderable saved");
        const imageBody = {
          filePath: imageFilePath,
          renderableId: renderable._id,
          userId: userId
        };
        console.log(imageBody);
        const image = new Image(imageBody);
        image.save().then(
          () => {
            resolve({ message: "image uploaded", id: image._id });
          },
          error => {
            reject({ error });
          }
        );
      },
      error => {
        console.log("Error");
        reject({ error });
      }
    );
  });
};
module.exports = { createImage };
