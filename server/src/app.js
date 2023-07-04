require("dotenv").config();

const express = require("express");
const configApp = require("../config/configApp");

const app = express();
configApp(app);

const { PORT } = process.env;

app.listen(PORT ?? 4000, () => {
  console.log(`Server started at port ${PORT}`);
});
