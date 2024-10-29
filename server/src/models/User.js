const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        userAddress: {
            type: DataTypes.STRING(255)
        },
        userGender: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userEmail: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'admin'
        }
    }, {
        tableName: 'User',
        timestamps: false
    });

    return User;
};