const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { folderPath } = req.query;
    cb(null, `fileStorage/${folderPath}/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  overwrite: true,
});

const fileFilter = (req, file, cb) => {
  const { folderPath } = req.query;
  const isDuplicate = req.dubbed.includes(file.originalname);
  if (isDuplicate) {
    const filePath = `fileStorage/${folderPath}/${file.originalname}`;
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

function handler(req, res) {
  if (req.dubbed.length) {
    res.json({ duplicates: req.dubbed });
  } else res.json({ message: "Files uploaded successfully" });
}

module.exports = { handler, upload };
