'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('users', [
      {
        userName: 'test1',
        cryptoWalletAddress: "address1",
        password: "$2a$12$wguJZ/ZhKWeMFIUu2E7h9eK7IP7EJBTdhzJlrpY2WqN4l7JLWVcZ6",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'test2',
        cryptoWalletAddress: "address2",
        password: "$2a$12$TwokrLFgrNRmEinfKTvfAuI8ENktkCdVq2j4pvofWaSI0eujBwEle",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'test3',
        cryptoWalletAddress: "address3",
        password: "$2a$12$9E8WMIEcxKsSBHn2lSaIc..BGmfF7fFPQSfkWJd7MzCdY09qtqzOy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'test4',
        cryptoWalletAddress: "address4",
        password: "$2a$12$EjmJJOVIitnVKnCdGk2kd.BzDwQcdUN37YgOgGKNjebWHTorZCvlC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
