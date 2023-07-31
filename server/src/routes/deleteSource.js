const router = require("express").Router();
const fs = require("fs");
const { message, deleteFolder } = require("../fs/deleteFolder");

router.post("/", async (req, res) => {
  const { pathToSource } = req.body;
  const fullPath = `fileStorage/${pathToSource}`;
  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
    const result = await deleteFolder(fullPath);
    if (result.message) {
      res.status(200).json(result.message);
    } else {
      res.status(500).json(result.error);
    }
  } else {
    await fs.promises.unlink(fullPath);
    res.status(200).json(message);
  }
});

module.exports = router;
