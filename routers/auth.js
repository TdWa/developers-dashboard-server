const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const { SALT_ROUNDS } = require("../config/constants");
const User = require("../models/").user;
const Category = require("../models/").category;
const Snippet = require("../models/").snippet;
const Link = require("../models/").link;
const auth = require("../auth/middleware");

const router = new Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both an email and a password" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }
    delete user.dataValues["password"];
    const token = toJWT({ userId: user.id });

    const categories = await Category.findAll({
      where: { userId: user.dataValues.id },
    });
    const links = await Link.findAll({
      where: { userId: user.dataValues.id },
    });
    const snippets = await Snippet.findAll({
      where: { userId: user.dataValues.id },
    });

    return res.status(200).send({
      user: { token, ...user.dataValues },
      categories,
      links,
      snippets,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .send({ message: "Please provide an email, password and a name" });
  }
  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newUser.dataValues["password"];

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (e) {
    console.log(e);

    if (e.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    } else {
      return res.status(400).send({ message: "Something went wrong, sorry" });
    }
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    delete req.user.dataValues["password"];

    const categories = await Category.findAll({
      where: { userId: req.user.dataValues.id },
    });
    const links = await Link.findAll({
      where: { userId: req.user.dataValues.id },
    });
    const snippets = await Snippet.findAll({
      where: { userId: req.user.dataValues.id },
    });

    return res.status(200).send({
      user: req.user.dataValues,
      categories,
      links,
      snippets,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
