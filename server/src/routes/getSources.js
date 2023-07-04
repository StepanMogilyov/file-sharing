const router = require("express").Router();
const fs = require("fs");

router.post("/", async (req, res) => {
  const { folderPath } = req.body;
  const sourcesList = await fs.promises.readdir(`fileStorage/${folderPath}`);
  res.json({ sourcesList, folderPath });
});

module.exports = router;
