"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "React",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "React-Redux",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Terminal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Node",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
