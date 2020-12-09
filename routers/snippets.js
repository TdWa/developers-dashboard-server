const { Router } = require("express");
const Snippet = require("../models/").snippet;
const router = new Router();
const auth = require("../auth/middleware");

router.patch("/", auth, async (req, res, next) => {
  try {
    console.log("i got hetre");
    const { content, id } = req.body;

    const idToFind = parseInt(id);

    console.log("what is req.body?", req.body);

    const snippet = await Snippet.findByPk(idToFind);

    await snippet.update({ content });

    return res.status(201).send({ message: " snippet updated", snippet });
  } catch (e) {
    console.log("i am error", e.message);
    next();
  }
});
router.patch("/comments", async (req, res, next) => {
  try {
    // console.log("i got hetre");
    const { comment, id } = req.body;

    const idToFind = parseInt(id);

    // console.log("what is req.body?", req.body);

    const snippet = await Snippet.findByPk(idToFind);

    await snippet.update({ comment });

    return res.status(201).send({ message: " snippet updated", snippet });
  } catch (e) {
    console.log("i am error", e.message);
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

router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log("params are", req.params);

    const toDelete = await Snippet.findByPk(id);
    if (!toDelete) {
      res.status(404).send("snippet not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    console.log("i am error message", e.message);
    next(e);
  }
});

/* get all snippets belonging to the user

router.get("/", auth, async (req, res, next) => {
  try {
    const id = req.user.dataValues.id;

    const allSnippetsByUserId = await Snippet.findAll({
      where: { userId: id },
    });

    res.status(200).send(allSnippetsByUserId);
  } catch (e) {
    console.log("i am error message", e.message);
    next();
  }
});
*/
module.exports = router;
