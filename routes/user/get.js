const { User } = require("./../../models/user.js");
const getUserInfo = token => {
  return new Promise((resolve, reject) => {
    console.log("Get user called");
    User.findByToken(token).then(
      success => resolve(success),
      error => {
        console.log(error);
        reject(error);
      }
    );
  });
};
const getClients = () => {
  return new Promise((resolve, reject) => {
    User.find().then(
      users => {
        if (!users) {
          resolve("no users found");
        } else {
          const userArr = [];
          users.forEach(user => {
            userArr.push({
              title: user.title,
              description: user.description,
              id: user._id
            });
          });
          resolve(userArr);
        }
      },
      error => reject(error)
    );
  });
};
module.exports = { getUserInfo, getClients };
