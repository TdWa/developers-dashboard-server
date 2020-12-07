const { Router } = require("express");
const Category = require("../models/").category;
const auth = require("../auth/middleware");

const router = new Router();

// get all categories belonging to the user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.dataValues.id;
    const categories = await Category.findAll({
      where: {
        userId,
      },
    });
    return res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// add a new category with userId
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.dataValues.id;
    const name = req.body.category;

    const newCategory = await Category.create({ name, userId });

    return res.status(200).send(newCategory);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
