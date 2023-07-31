const router = require("express").Router();
const fs = require("fs");
const { SharedSource } = require("../../db/models");

router.post("/", async (req, res) => {
  const { folderPath } = req.body;
  try {
    const [sourcesList, sharedSources] = await Promise.all([fs.promises.readdir(`fileStorage/${folderPath}`), SharedSource.findAll({ where: { folderPath }, raw: true })]);
    const sources = sourcesList.map((el) => {
      const indexOfSharedSource = sharedSources.findIndex((elem) => elem.sourceName === el);
      return { sourceName: el, link: indexOfSharedSource >= 0 ? sharedSources[indexOfSharedSource].link : "" };
    });
    res.json(sources);
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
