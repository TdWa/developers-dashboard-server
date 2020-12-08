const { Router } = require("express");
const User = require("../models/").user;
const Snippet = require("../models/").snippet;
const router = new Router();
const auth = require("../auth/middleware");

router.get("/", auth, async (req, res, next) => {
  try {
    console.log("i am req.user", req.user);
    const id = req.user.dataValues.id;
    parseInt(id);
    console.log("userId is  ", id);

    const allSnippetsByUserId = await Snippet.findAll({
      where: { userId: id },
    });

    res.status(200).send(allSnippetsByUserId);
  } catch (e) {
    console.log("i am error message", e.message);
    next();
  }
});

module.exports = router;
