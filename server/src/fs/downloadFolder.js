const archiver = require("archiver");
const path = require("path");
const fs = require("fs");

module.exports = function downloadFolder(sourcePath, _, res) {
  try {
    if (!fs.existsSync(sourcePath) || !fs.lstatSync(sourcePath).isDirectory()) {
      return res.status(404).json({ error: "Папка не найдена" });
    }
    const outputFilePath = path.join(__dirname,"../../temp", "temp_archive.zip");
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver("zip");
    archive.pipe(output);
    archive.directory(sourcePath, false);
    archive.finalize();
    output.on("close", () => {
      res.setHeader("Content-disposition", `attachment; filename=filename`);
      res.setHeader("Content-type", "application/zip");
      res.sendFile(outputFilePath, () => {
        fs.unlink(outputFilePath, (err) => {
          if (err) {
            console.error("Ошибка при удалении временного архива:", err);
          }
        });
      });
    });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
