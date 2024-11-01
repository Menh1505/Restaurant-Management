const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Invoice = sequelize.define('Invoice', {
        invoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        customerPhoneNumber: {
            type: DataTypes.STRING(15)
        },
        customerEmail: {
            type: DataTypes.STRING(100)
        },
        checkIn: {
            type: DataTypes.DATE
        },
        checkOut: {
            type: DataTypes.DATE
        },
        detailId: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'Invoice',
        timestamps: false
    });
    return Invoice;
}