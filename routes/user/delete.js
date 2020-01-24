const { User } = require("./../../models/user.js");
const logout = token => {
  return new Promise((resolve, reject) => {
    console.log("Get user called");
    User.findByToken(token).then(
      user => {
        if (!user) {
          reject("malformed token");
        } else {
          console.log(JSON.stringify(user.user));
          User.findById(user.user.id).then(userFull => {
            if (!userFull) {
              reject("User not found");
            } else {
              userFull.tokens.pull(token);
              userFull.save().then(
                () => {
                  console.log("logged out");
                  resolve({ message: "logged out" });
                },
                error => {
                  //console.log(error);
                  reject(error);
                }
              );
            }
          });
        }
      },
      error => {
        console.log(error);
        reject(error);
      }
    );
  });
};
module.exports = { logout };
