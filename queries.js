const { User, Snippet } = require("./models");

async function snippetsByUserId(id) {
  try {
    const snippets = await Snippet.findAll({
      where: (userId = id),
    });

    return snippets.map((s) => s.get({ plain: true }));
  } catch (e) {
    console.log("i am error message!!!!", e);
  }
}

snippetsByUserId(2).then((s) => console.log("i am sinppets", s));
