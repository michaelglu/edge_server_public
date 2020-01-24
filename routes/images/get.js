const { Image } = require("./../../models/augmentedImage.js");
const getImage = imageId => {
  return new Promise((resolve, reject) => {
    Image.findById(imageId).then(
      image => {
        if (!image) {
          reject({ message: "image not found" });
        } else {
          resolve(image);
        }
      },
      error => {
        reject({ error });
      }
    );
  });
};
const getAllImages = clientId => {
  return new Promise((resolve, reject) => {
    Image.find({ userId: clientId }).then(
      images => {
        if (!images) {
          reject({ message: "images not found" });
        } else {
          resolve(images);
        }
      },
      error => {
        reject({ error });
      }
    );
  });
};

module.exports = { getImage, getAllImages };
