const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const options = { useNewUrlParser: true };
mongoose.connect(

  "mongodb path here",
  options,
  function(error) {
    if (error) {
      console.log(error);
    }
  }
);

module.exports = { mongoose };
