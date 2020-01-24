//__________________________External____________________________________________
const express = require("express");
const app = express();
const multer = require("multer");
const mongoose = require("./config/mongoose.js");
const bodyParser = require("body-parser");
//__________________________Image+Renderable____________________________________
const { createImage } = require("./routes/images/post.js");
const { addModelFile } = require("./routes/renderables/patch.js");
const { getImage, getAllImages } = require("./routes/images/get.js");
const { getRenderable } = require("./routes/renderables/get.js");
const {
  deleteFile,
  deleteRenderableKey
} = require("./routes/renderables/delete.js");
const { deleteImage } = require("./routes/images/delete.js");
//__________________________Custom Middleware___________________________________
const { authUser } = require("./config/authuser.js");
const { getWeather } = require("./config/weather.js");
const { imageUploader, modelUploader } = require("./config/multer.js");
//__________________________Users_______________________________________________
const { addUser } = require("./routes/user/post.js");
const { getUserInfo, getClients } = require("./routes/user/get.js");
const { login } = require("./routes/user/put.js");
const { logout } = require("./routes/user/delete.js");
//______________________________________________________________________________
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("You've reached the AR Core Edge Storage");
});

app.get("/weathertest", (req, res) => {
  getWeather().then(
    weather => {
      res.send(weather);
    },
    error => res.send(error)
  );
});

app.post(
  "/uploadimage",
  authUser,
  imageUploader.single("augmentedImage"),
  (req, res, next) => {
    if (!req.file) {
      res.send({ message: "File not uploaded" });
    } else {
      console.log(req.file);
      createImage({
        imageFilePath:
          req.protocol + "://" + req.hostname + "/" + req.file.path,
        userId: req.userId
      }).then(
        success => {
          res.send(success);
        },
        error => {
          res.send(error);
        }
      );
    }
  }
);

app.patch(
  "/uploadmodel",
  authUser,
  modelUploader.single("model"),
  (req, res, next) => {
    if (!req.file) {
      res.send({ message: "File not uploaded" });
    } else {
      console.log(req.file);
      console.log(req.header("renderableId") + "\n" + req.header("modelKey"));
      addModelFile({
        renderableId: req.header("renderableId"),
        key: req.header("modelKey"),
        path: req.protocol + "://" + req.hostname + "/" + req.file.path
      }).then(
        success => {
          res.send(success);
        },
        error => {
          res.send(error);
        }
      );
    }
  }
);

app.get("/getImage", (req, res) => {
  getImage(req.header("imageId")).then(
    success => res.send(success),
    error => res.send(error)
  );
});
app.get("/getAllImage", (req, res) => {
  getAllImages(req.header("clientId")).then(
    success => res.send(success),
    error => res.send(error)
  );
});

app.get("/getRenderable", (req, res) => {
  getRenderable({
    renderableId: req.header("renderableId")
  }).then(success => res.send(success), error => res.send(error));
});
app.delete("/deleteRenderable", authUser, (req, res) => {
  console.log(req.header("id"));
  deleteRenderableKey(req.header("id"), req.header("key")).then(
    success => res.send(success),
    error => {
      res.send(error);
    }
  );
});
app.delete("/deleteImage", authUser, (req, res) => {
  console.log(req.header("imageId"));
  deleteImage(req.header("imageId")).then(
    success => res.send(success),
    error => res.send(error)
  );
});
app.use("/images", express.static("images"));
app.use("/3dmodels", express.static("3dmodels"));
//__________________________Users_______________________________________________
app.get("/clients/all", (req, res) => {
  getClients().then(
    success => res.send(success),
    error => res.status(500).send(error)
  );
});

app.post("/users/register", (req, res) => {
  console.log(req.body.user);
  addUser(req.body.user).then(
    success => res.send(success),
    error => res.status(500).send(error)
  );
});
app.get("/users/get", (req, res) => {
  getUserInfo(req.header("token")).then(
    success => res.send(success),
    error => res.status(500).send(error)
  );
});
app.put("/users/login", (req, res) => {
  console.log(req.body.user);
  login(req.body.user).then(
    success => res.send(success),
    error => res.status(500).send(error)
  );
});
app.delete("/users/logout", (req, res) => {
  logout(req.header("token")).then(
    success => res.send(success),
    error => res.status(500).send(error)
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on 3000`);
});
