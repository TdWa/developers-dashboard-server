const { Router } = require("express");
const User = require("../models/").user;
const Snippet = require("../models/").snippet;
const router = new Router();
const auth = require("../auth/middleware");

router.get("/", auth, async (req, res, next) => {
  try {
    const { userId } = req.user.id;
    parseInt(userId);
    console.log("userId is  ", userId);

    const allSnippetsByUserId = await Snippet.findAll({
      where: { userId: userId },
    });

    res.status(200).send(allSnippetsByUserId);
  } catch (e) {
    console.log("i am error message", e.message);
    next();
  }
});

module.exports = router;
