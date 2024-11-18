const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BookingTable = sequelize.define('BookingTable', {
        BookingID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Tên khách hàng không được để trống"
                },
                len: {
                    args: [2, 100],
                    msg: "Tên phải có độ dài từ 2 đến 100 ký tự"
                }
            }
        },
        customerPhoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Số điện thoại không được để trống"
                },
                is: {
                    args: /^[0-9]{10,15}$/,
                    msg: "Số điện thoại không hợp lệ"
                }
            }
        },
        customerEmail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Email không được để trống"
                },
                isEmail: {
                    msg: "Email không hợp lệ"
                }
            }
        },
        personNum: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Số người không được để trống"
                },
                min: {
                    args: 1,
                    msg: "Số người phải lớn hơn 0"
                },
                max: {
                    args: 8,
                    msg: "Số người không được vượt quá 8"
                },
                isInt: {
                    msg: "Số người phải là số nguyên"
                }
            }
        },
        dayBooking: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Ngày đặt bàn không được để trống"
                },
                isDate: {
                    msg: "Ngày đặt bàn không hợp lệ"
                },
                isFuture(value) {
                    if (new Date(value) < new Date()) {
                        throw new Error('Ngày đặt bàn phải là ngày trong tương lai');
                    }
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true
        }
    }, {
        tableName: 'Booking',
        timestamps: false
    });

    return BookingTable;
};