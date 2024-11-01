const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Dish = sequelize.define('Dish', {
        dishId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dishName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        dishPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        dishImage: {
            type: DataTypes.STRING(255)
        },
        dishDetail: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'Dish',
        timestamps: false
    });

    return Dish;
};