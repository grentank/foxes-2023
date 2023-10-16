/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Alex',
          email: '1@1',
          phone: '79267974451',
        },
        {
          name: 'Bob',
          email: '2@2',
          phone: '79999999999',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Messages',
      [
        { text: 'Hello', authorId: 1 },
        { text: 'Hi', authorId: 2 },
        { text: 'How are you?', authorId: 1 },
        { text: 'I am fine', authorId: 2 },
        { text: 'What is your name?', authorId: 1 },
        { text: 'My name is Alex', authorId: 2 },
        { text: 'What is your phone number?', authorId: 1 },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
