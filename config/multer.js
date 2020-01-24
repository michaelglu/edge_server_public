const multer = require("multer");
const path = require("path");
//MULTER SETUP
const imageStorage = multer.diskStorage({
  destination: "./images",
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const imageFilter = (req, file, callback) => {
  if (
    path.extname(file.originalname) !== ".jpg" &&
    path.extname(file.originalname) !== ".png"
  ) {
    return callback(null, false);
  }
  callback(null, true);
};

const imageUploader = multer({
  storage: imageStorage,
  fileFilter: imageFilter
});

const modelStorage = multer.diskStorage({
  destination: "./3dmodels",
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const modelFilter = (req, file, callback) => {
  if (path.extname(file.originalname) !== ".glb"&&path.extname(file.originalname) !== ".sfb") {
    return callback(null, false);
  }
  callback(null, true);
};

const modelUploader = multer({
  storage: modelStorage,
  fileFilter: modelFilter
});

module.exports = { imageUploader, modelUploader };
