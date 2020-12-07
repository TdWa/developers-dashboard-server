const { Router } = require("express");
const Category = require("../models/").category;

const router = new Router();

// get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// add a new category
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const name = req.body.category;

    const newCategory = await Category.create({ name, userId });

    return res.status(200).send(newCategory);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
