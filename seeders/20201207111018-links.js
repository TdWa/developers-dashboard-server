"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "links",
      [
        {
          name: "react docs",
          content: "https://reactjs.org/",
          userId: 1,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "redux docs",
          content: "https://react-redux.js.org/",
          userId: 1,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "terminal cheat sheet",
          content: "https://gist.github.com/squarism/ae3613daf5c01a98ba3a",
          userId: 1,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "node docs",
          content: "https://nodejs.org/en/",
          userId: 1,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("links", null, {});
  },
};
