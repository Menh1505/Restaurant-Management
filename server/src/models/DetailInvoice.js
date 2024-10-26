const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DetailInvoice = sequelize.define('DetailInvoice', {
        detailId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        invoiceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Invoice',
                key: 'invoiceId'
            }
        },
        listDishesWithAmount: {
            type: DataTypes.JSON,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'DetailInvoice',
        timestamps: false
    });

    DetailInvoice.associate = (models) => {
        DetailInvoice.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
    };

    return DetailInvoice;
};