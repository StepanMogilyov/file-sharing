const fs = require("fs");
const path = require("path");

const message = { message: "Source deleted successfully" };
const error = { error: "Failed to delete source" };

async function deleteFolder(folderPath) {
  try {
    if (fs.existsSync(folderPath)) {
      const files = await fs.promises.readdir(folderPath);
      for (const file of files) {
        const curPath = path.join(folderPath, file);
        if ((await fs.promises.lstat(curPath)).isDirectory()) {
          await deleteFolder(curPath);
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

module.exports = { deleteFolder, message, error };
