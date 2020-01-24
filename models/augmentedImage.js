const mongoose = require("mongoose");
const AugmentedImageSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  renderableId: { type: String, required: true },
  userId: { type: String, required: true }
});
const Image = mongoose.model("AugmentedImage", AugmentedImageSchema);
module.exports = { Image };
