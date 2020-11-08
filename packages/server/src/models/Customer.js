const CustomersService = require("../domain/customers");

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        "Customer",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            phone: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            address: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            notes: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("NOW()"),
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("NOW()"),
            },
        },
        {
            tableName: "sl_customers",
        }
    );

    Customer.associate = () => {
        const { StaffMember, CustomerInterest } = sequelize.models;

        Customer.belongsTo(StaffMember, {
            as: "assignedStaffMember",
            foreignKey: {
                name: "staffMemberId",
                allowNull: false,
            },
        });

        Customer.belongsTo(CustomerInterest, {
            as: "interest",
            foreignKey: {
                name: "CustomerInterestId",
                allowNull: false,
            },
        });

    };

    return Customer;
};
