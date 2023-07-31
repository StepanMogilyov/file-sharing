const router = require("express").Router();
const fs = require("fs");
const downloadFile = require("../fs/downloadFile");
const downloadFolder = require("../fs/downloadFolder");

router.post("/", async (req, res) => {
  const { pathToSource, sourceName, type } = req.body;
  const sourcePath = `fileStorage/${pathToSource}`;

  if (!fs.existsSync(sourcePath)) return res.status(404).json({ error: "Ресурс не найден" });

  if (type === "file") downloadFile(sourcePath, sourceName, res);
  if (type === "folder") downloadFolder(sourcePath, sourceName, res);
});

module.exports = router;


