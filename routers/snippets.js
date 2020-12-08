const { Router } = require("express");
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

// create a snippet
router.post("/", auth, async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const { categoryId, name, content, comment } = req.body;
    const newSnippet = await Snippet.create({
      userId,
      categoryId,
      name,
      content,
      comment,
    });

    res.status(200).send(newSnippet);
  } catch (e) {
    console.log("i am error message", e.message);
    next();
  }
});

module.exports = router;
