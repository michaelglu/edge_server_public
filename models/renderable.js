const mongoose = require("mongoose");
const RenderableSchema = new mongoose.Schema({
  filePaths: { type: Map, of: String }
});
const Renderable = mongoose.model("Renderable", RenderableSchema);
module.exports = { Renderable };
