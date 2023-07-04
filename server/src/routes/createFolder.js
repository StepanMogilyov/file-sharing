const router = require("express").Router();
const createDir = require("../fs/createDir");

router.post("/", async (req, res) => {
  const { folderName, folderPath } = req.body;
  const fullPath = `fileStorage/${folderPath}/${folderName}`;
  const isSuccess = await createDir(fullPath);
  if (isSuccess) {
    res.status(200).json({ message: "Directory created successfully" });
  } else {
    res.status(500).json({ error: "Failed to create directory" });
  }
});

module.exports = router;
