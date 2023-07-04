const router = require("express").Router();
const bcrypt = require("bcrypt")
const { User } = require("../../db/models");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      const comparePassword = await bcrypt.compare(password, checkEmail.password);
      if(comparePassword) {
        req.session.name = checkEmail.name;
        req.session.surname = checkEmail.surname;
        req.session.surname = checkEmail.email;
        req.session.userId = checkEmail.id;
        req.session.save(() => {
          res.json({ isApproved: true, name: checkEmail.name, surname: checkEmail.surname, email: checkEmail.email, userId: checkEmail.id });
        });
      } else {
        res.json({ isApproved: false, notification: "Invalid password" });
      }
    } else {
      res.json({ isApproved: false, notification: "Invalid email" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;