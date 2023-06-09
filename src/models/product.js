'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Categories, { foreignKey: 'category', targetKey: 'id', as: 'CateData' });
            Product.belongsTo(models.Categories, { foreignKey: 'category', as: 'ProData' });
              
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.STRING,
            sale: DataTypes.STRING,
            amount: DataTypes.STRING,
            category: DataTypes.STRING,
            description: DataTypes.STRING,
            image: DataTypes.STRING,
            unixTask: DataTypes.STRING,
            rate: DataTypes.STRING,
            isDeleted: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
