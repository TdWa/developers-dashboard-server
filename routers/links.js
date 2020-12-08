const { Router } = require("express");
const User = require("../models/").user;
const Link = require("../models/").link;
const router = new Router();
const auth = require("../auth/middleware");

router.get("/", auth, async (req, res, next) => {
  try {
    console.log("i am req.user", req.user);
    const id = req.user.dataValues.id;
    parseInt(id);
    console.log("userId is  ", id);

    const allLinksByUserId = await Link.findAll({
      where: { userId: id },
    });

    res.status(200).send(allLinksByUserId);
  } catch (e) {
    console.log("i am error message", e.message);
    next();
  }
});

router.delete("/deleteLink", async (req, res) => {
  try {
    const { id } = req.body;
    const toDelete = await Link.findByPk(id);
    if (!toDelete) {
      res.status(404).send("Link not found");
    } else {
      await toDelete.destroy();
      res.json(toDelete);
    }
  } catch (e) {
    console.log(e);
  }
});

// create a link
router.post("/", auth, async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const { categoryId, name, content } = req.body;
    const newLink = await Link.create({
      userId,
      categoryId,
      name,
      content,
    });

    res.status(200).send(newLink);
  } catch (e) {
    console.log("i am error message", e.message);
    next();
  }
});

module.exports = router;
