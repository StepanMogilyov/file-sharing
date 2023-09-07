const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

router.post("/", async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    const checkEmailIfExists = await User.findOne({ where: { email } });
    if (!checkEmailIfExists) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, surname, email, password: hashedPassword });
      req.session.name = newUser.name;
      req.session.surname = newUser.surname;
      req.session.email = newUser.email;
      req.session.userId = newUser.id;
      req.session.save(() => {
        res.json({ isApproved: true, name: newUser.name, surname: newUser.surname, email: newUser.email, userId: newUser.id });
      });
    } else {
      res.json({ isApproved: false, notification: "The address is already in use" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
