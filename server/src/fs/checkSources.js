const fs = require("fs");

module.exports = async function checkSources(req, res, next) {
  const { folderPath } = req.query;
  const fileNames = JSON.parse(req.query.fileNames);
  const dubbed = [];
  try {
    const sources = await fs.promises.readdir(`fileStorage/${folderPath}/`);
    for (const fileName of fileNames) if (sources.includes(fileName)) dubbed.push(fileName);
    req.dubbed = dubbed;
    next();
  } catch (err) {
    console.error("Error creating directory:", err);
  }
};
