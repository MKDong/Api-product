'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            desc: {
                type: Sequelize.STRING,
            },
            keyMap: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            timeStart: {
                type: Sequelize.STRING,
            },
            timeDone: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tasks');
    },
};
