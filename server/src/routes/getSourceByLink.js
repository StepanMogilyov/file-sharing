const router = require("express").Router();
const { SharedSource } = require("../../db/models");

router.post("/", async (req, res) => {
  const { link } = req.body;
  const source = await SharedSource.findOne({ where: { link }, raw: true });
  res.json({ source });
});

module.exports = router;
