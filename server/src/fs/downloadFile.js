const fs = require("fs");

module.exports = function downloadFile(sourcePath, sourceName, res) {
  try {
    fs.readFile(sourcePath, (err, data) => {
      if (err) {
        console.error("Ошибка при чтении файла:", err);
        return res.status(500).json({ error: "Ошибка чтения файла" });
      }

      res.setHeader("Content-disposition", `attachment; filename=${sourceName}`);
      res.setHeader("Content-type", "application/octet-stream");
      res.send(data);
    });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
