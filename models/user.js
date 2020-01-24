const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: { type: String, required: true },
  title: { type: String, required: true }, //DUKE LEMUR CENTER
  description: { type: String }, //Organization desctiption,
  tokens: [{ type: String }] //auth tokens
});
userSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    console.log("password not modified");
    next();
  }
});
userSchema.methods.generateToken = function() {
  return new Promise((resolve, reject) => {
    const user = this;
    const accessToken = jwt.sign(
      { userId: user._id.toString() },
      "SECRET_KEY",
      { expiresIn: 3600 }
    );
    user.tokens.push(accessToken.toString());
    user.save().then(
      () => {
        resolve({ token: accessToken.toString() });
      },
      error => reject(error)
    );
  });
};
userSchema.statics.findByToken = function(token) {
  console.log("METHOD CALL");
  return new Promise((resolve, reject) => {
    console.log("FIRED");
    const User = this;
    try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      User.findById(decoded.userId).then(
        user => {
          if (!user) {
            reject({ message: "no user found" });
          } else {
            if (user.tokens.includes(token)) {
              resolve({
                message: "token verified",
                user: {
                  id: user._id,
                  title: user.title,
                  description: user.description
                }
              });
            } else {
              reject({ message: "invalid token" });
            }
          }
        },
        error => reject({ message: error })
      );
    } catch (error) {
      console.log("Not Verified");
      reject({ message: "invalid token", error });
    }
  });
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
