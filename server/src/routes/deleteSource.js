const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const message = { message: "Source deleted successfully" };
const error = { error: "Failed to delete source" };

router.post("/", async (req, res) => {
  const { folderPath } = req.body;
  const fullPath = `fileStorage/${folderPath}`;
  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
    const result = await deleteFolderRecursive(fullPath);
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

async function deleteFolderRecursive(folderPath) {
  try {
    if (fs.existsSync(folderPath)) {
      const files = await fs.promises.readdir(folderPath);
      for (const file of files) {
        const curPath = path.join(folderPath, file);
        if ((await fs.promises.lstat(curPath)).isDirectory()) {
          await deleteFolderRecursive(curPath);
        } else {
          await fs.promises.unlink(curPath);
        }
      }
      await fs.promises.rmdir(folderPath);
      return message;
    }
  } catch (err) {
    console.log("err: ", err);
    return error;
  }
}
