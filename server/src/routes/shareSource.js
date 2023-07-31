const router = require("express").Router();
const fs = require("fs");
const { SharedSource } = require("../../db/models");

function generateLink() {
  const alphabet = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  let link = "";
  while (link.length <= 15) link += alphabet[Math.floor(Math.random() * alphabet.length)];
  return link;
}

async function checkLink(folderPath, sourceName, type, address) {
  const link = address + generateLink();
  const isLinkExists = await SharedSource.findOne({ where: { link } });
  if (!isLinkExists) {
    await SharedSource.create({ folderPath, sourceName, type, link });
  } else {
    checkLink(sourceName);
  }
}

router.post("/", async (req, res) => {
  const { sourceName, pathToSource, folderPath, address } = req.body;
  const sourceType = fs.lstatSync(`fileStorage/${pathToSource}`).isDirectory();
  checkLink(folderPath, sourceName, sourceType ? "folder" : "file", address);
  res.end();
});

module.exports = router;
