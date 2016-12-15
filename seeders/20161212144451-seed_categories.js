'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Categories', [{
      categoryId: 1,
      name      : 'E-Commerce',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 2,
      name      : 'EdTech',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 3,
      name      : 'FinTech',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 4,
      name      : 'IoT',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 5,
      name      : 'Art & Culture',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 6,
      name      : 'Agriculture',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 7,
      name      : 'Health & Lifestyle',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 8,
      name      : 'On Demand Service',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 9,
      name      : 'Games',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 10,
      name      : 'Software',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      categoryId: 11,
      name      : 'Mobile',
      createdAt : new Date(),
      updatedAt : new Date()
    }])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Categories', null)
  }
};
