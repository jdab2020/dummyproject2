module.exports = function (sequelize, DataTypes) {
    const Stock = sequelize.define("Stock", {
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            timestamps: false,
            validate: {
                len: [1, 10]
            }
        }
    });
    return Stock;
};