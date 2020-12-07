"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "snippets",
      [
        {
          name: "how to set up react app",
          content: "npx create-react-app",
          comment: "this is super useful",
          userId: 1,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "for react-redux",
          content: "const user = useSelector(selectUser)",
          comment: "how to access user from store",
          userId: 1,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "for terminal",
          content: "cd ls .. pwd",
          comment: "most used commands",
          userId: 1,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "for node",
          content: 'const User = require("../models").user;',
          comment: "how to import models into router for query",
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
    await queryInterface.bulkDelete("snippets", null, {});
  },
};
