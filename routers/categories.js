const { Router } = require("express");
const Category = require("../models/").category;
const Link = require("../models/").link;
const Snippet = require("../models/").snippet;
const auth = require("../auth/middleware");

const router = new Router();

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

// delete a category and its links and snippets
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.body;
    const categoryToDelete = await Category.findByPk(id);
    if (!categoryToDelete) {
      return res.status(404).send({ message: "category not found" });
    }

    const linksToDelete = await Link.findAll({
      where: {
        categoryId: id,
      },
    });

    await Link.destroy({
      where: {
        categoryId: id,
      },
    });

    const snippetsToDelete = await Snippet.findAll({
      where: {
        categoryId: id,
      },
    });

    await Snippet.destroy({
      where: {
        categoryId: id,
      },
    });

    await categoryToDelete.destroy();

    return res.status(200).send({
      categoryId: categoryToDelete.id,
      linkIds: linksToDelete.map((link) => link.id),
      snippetIds: snippetsToDelete.map((snippet) => snippet.id),
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

/* get all categories belonging to the user

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
*/

module.exports = router;
