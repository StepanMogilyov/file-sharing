const router = require("express").Router();

router.get("/", (req, res) => {
  const { name, surname, email, userId } = req.session;
  if (req.session.name) {
    res.json({ name, surname, email, userId });
  } else {
    res.json(false);
  }
});

module.exports = router;
