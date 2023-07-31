const router = require("express").Router();
const fs = require("fs");

const { SharedSource } = require("../../db/models");

router.post("/", async (req, res) => {
  const { link } = req.body;
  const source = await SharedSource.findOne({ where: { link }, raw: true });
  const isSourceOrNot = fs.existsSync(`fileStorage/${source.folderPath}/${source.sourceName}`);
  res.json({ source, message: !isSourceOrNot ? "Файлы были удалены" : "" });
});

module.exports = router;
