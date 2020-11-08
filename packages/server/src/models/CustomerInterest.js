module.exports = (sequelize, DataTypes) => {
    const CustomerInterest = sequelize.define(
      "CustomerInterest",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
  
        hardwareType: {
            type: DataTypes.ENUM("cleaning", "kitchen", "warehouse"),
            allowNull: false,
        },

        autonomy: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },

        weight: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },

        minPrice: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },

        maxPrice: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
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
        tableName: "sl_customer_interests",
      }
    );

    CustomerInterest.associate = () => {
        const { Customer, Brand } = sequelize.models;
    
        CustomerInterest.belongsTo(Brand, {
          as: "brand",
          foreignKey: {
            name: "brandId",
            allowNull: false,
          },
        });


      };
  
    return CustomerInterest;
  };