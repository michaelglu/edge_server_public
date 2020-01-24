const { User } = require("./../models/user.js");

const authUser = function(req, res, next) {
  User.findByToken(req.header("token")).then(
    user => {
      req.userId = user.user.id;
      next();
    },
    error => {
      res.status(401).send("invalid authentication");
    }
  );
};
module.exports = { authUser };
