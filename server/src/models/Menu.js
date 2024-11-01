const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Menu = sequelize.define('Menu', {
        menuId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        menuName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        listDishes: {
            type: DataTypes.JSON
        }
    }, {
        tableName: 'Menu',
        timestamps: true
    });

    return Menu;
}
