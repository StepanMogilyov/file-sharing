const fs = require("fs");

module.exports = async function createDir(folderPath) {
  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
    return true;
  } catch (err) {
    console.error("Error creating directory:", err);
    return false;
  }
};
