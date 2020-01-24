const { User } = require("./../../models/user.js");
const addUser = ({ email, password, title, description }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).then(
      user => {
        if (!user) {
          const userNew = new User({ email, password, title, description });
          userNew.save().then(
            () => {
              userNew.generateToken().then(
                token => {
                  resolve({ message: "success", token: token.token });
                },
                error => {
                  console.log(error);
                  reject(error);
                }
              );
            },
            error => {
              console.log(error);
              reject(error);
            }
          );
        } else {
          reject({ message: "email taken" });
        }
      },
      error => reject(error)
    );
  });
};
module.exports = { addUser };
