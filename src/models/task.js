'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Task.belongsTo(models.Allcode, { foreignKey: 'keyMap', targetKey: 'keyMap', as: 'taskData' });
            Task.belongsTo(models.Allcode, { foreignKey: 'status', targetKey: 'keyMap', as: 'statusData' });
        }
    }
    Task.init(
        {
            title: DataTypes.STRING,
            desc: DataTypes.STRING,
            userId: DataTypes.STRING,
            keyMap: DataTypes.STRING,
            status: DataTypes.STRING,
            timeStart: DataTypes.STRING,
            timeDone: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Task',
        },
    );
    return Task;
};
