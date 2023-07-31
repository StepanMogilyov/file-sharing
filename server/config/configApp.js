const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("path");

const { handler, upload } = require("../src/fs/multer");
const checkUserRouter = require("../src/routes/checkUser");
const regRouter = require("../src/routes/regUser");
const loginRouter = require("../src/routes/logUser");
const createFolder = require("../src/routes/createFolder");
const getSources = require("../src/routes/getSources");
const checkSources = require("../src/fs/checkSources");
const deleteSource = require("../src/routes/deleteSource");
const shareSource = require("../src/routes/shareSource");
const downloadSources = require("../src/routes/downloadSources");
const getSourceByLink = require("../src/routes/getSourceByLink");

module.exports = function configApp(app) {
  app.use(morgan("dev"));
  app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));

  const { SESSION_SECRET } = process.env;

  const sessionConfig = {
    name: "Session",
    store: new FileStore(),
    secret: SESSION_SECRET ?? "vasdg34erh35h24g31f23g3gh3hth",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 10,
      httpOnly: true,
    },
  };

  app.use(session(sessionConfig));

  //for deploy
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.use("/check-user", checkUserRouter);
  app.use("/registrate-user", regRouter);
  app.use("/login-user", loginRouter);
  app.use("/create-folder", createFolder);
  app.use("/send-file", checkSources, upload.array("files"), handler);
  app.use("/get-sources", getSources);
  app.use("/delete-source", deleteSource);
  app.use("/share-source", shareSource);
  app.use("/download-sources", downloadSources);
  app.use("/get-source-by-link", getSourceByLink);

  //for deploy
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../../client/build/index.html"));
  });
};
