const { Renderable } = require("./../../models/renderable.js");
const { getWeather } = require("./../../config/weather.js");

const getRenderable = ({ renderableId }) => {
  return new Promise((resolve, reject) => {
    Renderable.findById(renderableId).then(
      renderable => {
        if (!renderable) {
          reject({ message: "renderable not found" });
        } else {
          getWeather().then(
            success => {
              console.log(success);
              resolve({
                id: renderable._id,
                filePath: renderable.filePaths.get(success)
              });
            },
            error => {
              reject(error);
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
module.exports = { getRenderable };
