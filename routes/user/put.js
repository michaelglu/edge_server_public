const { User } = require("./../../models/user.js");
const bcrypt = require("bcryptjs");
const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }).then(
      user => {
        if (!user) {
          reject({ message: "no user found" });
        } else {
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              console.log("Passwords match");
              user.generateToken().then(
                token => {
                  resolve({ message: "success", token });
                },
                error => reject(error)
              );
            } else {
              console.log("passwords MISMATCH");
              reject({ message: "invalid password" });
            }
          });
        }
      },
      error => reject({ message: error })
    );
  });
};

module.exports = { login };
